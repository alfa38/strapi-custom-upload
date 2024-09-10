import { pipeline } from 'stream';
import path from 'path';
import fse from 'fs-extra';
import * as utils from '@strapi/utils';
import { CheckFileSizeOptions, IFile, InitOptions, IWhereQuery } from './types';



const { PayloadTooLargeError } = utils.errors;
const { kbytesToBytes, bytesToHumanReadable } = utils.file;

const UPLOADS_FOLDER_NAME = 'uploads';

const ensureDirectory = (uploadPath: string) => {
  const options = {
    mode: 0o2777 // crash with 0o2775
  };
  fse.ensureDirSync(uploadPath, options);
}

  const findFirstEntry = async (pluginId: string, query?: IWhereQuery) => {
    const entries = await strapi.entityService.findMany(pluginId, query);
    if (!entries) return {};
    if (Array.isArray(entries)) {
      if (entries.length === 0) {
        return {};
      } else {
        return entries[0];
      }
    }
  }
  const getCurrentTarget = async () => {
    const selection = await findFirstEntry('plugin::custom-upload.target-link');
    return selection;
  }

  const getCurrentUploadPath = async () => {
    const root = strapi.dirs.app.root;
    const currentTarget = await getCurrentTarget();
    const { link } = await findFirstEntry('plugin::custom-upload.custom-upload', {where: {name: currentTarget}})
    const uploadPath = path.resolve(`${root}/files/${link}`);
    if (!fse.pathExistsSync(uploadPath)) {
      ensureDirectory(uploadPath);
    }
    return { uploadPath, link };
}

const getUploadPathFromFile = (file: IFile) => {
  const url = file.url.split('?')[0];
  if (url.startsWith('public')) {
    return `${strapi.dirs.app.root}\\public\\${UPLOADS_FOLDER_NAME}\\${file.hash}${file.ext}`
  }
  // const filePath = file.url.split('/').splice(2).join('\\').split('?')[0];
  const filePath = url.split('/').splice(2).reduce((prevValue, nextValue) => `${prevValue}/${nextValue}`);
  return `${strapi.dirs.app.root}\\files\\${filePath}`;
}

export = {
  init({ sizeLimit: providerOptionsSizeLimit }: InitOptions = {}) {
    if (providerOptionsSizeLimit) {
      process.emitWarning(
        '[deprecated] In future versions, "sizeLimit" argument will be ignored from upload.config.providerOptions. Move it to upload.config'
      );
    }

    return {
      checkFileSize(file: File, options: CheckFileSizeOptions) {
        const { sizeLimit } = options ?? {};

        // TODO V5: remove providerOptions sizeLimit
        if (providerOptionsSizeLimit) {
          if (kbytesToBytes(file.size) > providerOptionsSizeLimit)
            throw new PayloadTooLargeError(
              `${file.name} exceeds size limit of ${bytesToHumanReadable(
                providerOptionsSizeLimit
              )}.`
            );
        } else if (sizeLimit) {
          if (kbytesToBytes(file.size) > sizeLimit)
            throw new PayloadTooLargeError(
              `${file.name} exceeds size limit of ${bytesToHumanReadable(sizeLimit)}.`
            );
        }
      },
      async uploadStream(file: IFile): Promise<void> {
        if (!file.stream) {
          return Promise.reject(new Error('Missing file stream'));
        }

        const { stream } = file;
        return new Promise(async (resolve, reject) => {
        const { uploadPath, link } = await getCurrentUploadPath();
          pipeline(
            stream,
            fse.createWriteStream(path.join(uploadPath, `${file.hash}${file.ext}`)),
            (err) => {
              if (err) {
                return reject(err);
              }

              file.url = `custom-upload/root-files${link.startsWith('/') ? link : `/${link}`}/${file.hash}${file.ext}`;
              resolve();
            }
          );
        });
      },
      async upload(file: IFile): Promise<void> {
        if (!file.buffer) {
          return Promise.reject(new Error('Missing file buffer'));
        }

        const { buffer } = file;
        return new Promise(async (resolve, reject) => {
        const { uploadPath, link } = await getCurrentUploadPath();
          // write file in public/assets folder
          fse.writeFile(path.join(uploadPath, `${file.hash}${file.ext}`), buffer, (err) => {
            if (err) {
              return reject(err);
            }

            file.url = `custom-upload/root-files${link.startsWith('/') ? link : `/${link}`}/${file.hash}${file.ext}`;
            resolve();
          });
        });
      },
      isPrivate(): boolean {
        return false;
      },
      delete(file: IFile): Promise<string | void> {
        return new Promise(async (resolve, reject) => {
          const uploadPath = getUploadPathFromFile(file);
          const filePath = uploadPath;

          console.log(filePath);

          if (!fse.existsSync(filePath)) {
            resolve("File doesn't exist");
            return;
          }

          // remove file from the path
          fse.unlink(filePath, (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      },
    };
  },
};