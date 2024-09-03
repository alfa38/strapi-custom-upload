import { pipeline } from 'stream';
import fs, { ReadStream } from 'fs';
import path from 'path';
import fse from 'fs-extra';
import * as utils from '@strapi/utils';
import _ from 'lodash';

interface File {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  sizeInBytes: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
  folderPath?: string;
}

const { PayloadTooLargeError } = utils.errors;
const { kbytesToBytes, bytesToHumanReadable } = utils.file;

const UPLOADS_FOLDER_NAME = 'uploads';

interface InitOptions {
  sizeLimit?: number;
  rootPath?: string,
  uploadDir?: string
}

interface CheckFileSizeOptions {
  sizeLimit?: number;
}



const ensureDirectory = async (uploadPath: string) => {
  const options = {
    mode: 0o2777 // crash with 0o2775
  };
  fse.ensureDirSync(uploadPath, options);
}

  const getCurrentTarget = async () => {
      const { selection } = await strapi.db.query('plugin::custom-upload.target-link').findOne();
    return selection;
  }
  const getCurrentUploadPath = async () => {
    const root = strapi.dirs.app.root;
    const currentTarget = await getCurrentTarget();
    const { link } = await strapi.db.query('plugin::custom-upload.custom-upload').findOne({where: {name: currentTarget}});
    const uploadPath = path.resolve(`${root}/files/${link}`);
    if (!fse.pathExistsSync(uploadPath)) {
      ensureDirectory(uploadPath);
    }
    return { uploadPath, link };
}

const getUploadPathFromFile = (file: File) => {
  if (file.url.startsWith('public')) {
    return `${strapi.dirs.app.root}\\public\\${UPLOADS_FOLDER_NAME}\\${file.hash}${file.ext}`
  }
  const filePath = file.url.split('/').splice(6).join('\\').split('?')[0];
  return `${strapi.dirs.app.root}\\files\\${filePath}`;
}

export = {
  init({ sizeLimit: providerOptionsSizeLimit, rootPath, uploadDir }: InitOptions = {}) {
    // TODO V5: remove providerOptions sizeLimit
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
      async uploadStream(file: File): Promise<void> {
        if (!file.stream) {
          return Promise.reject(new Error('Missing file stream'));
        }

        const { stream } = file;
        return new Promise(async (resolve, reject) => {
        const { uploadPath, link } = await getCurrentUploadPath();
          pipeline(
            stream,
            fs.createWriteStream(path.join(uploadPath, `${file.hash}${file.ext}`)),
            (err) => {
              if (err) {
                return reject(err);
              }

              // file.url = `/${rootPath ?? 'public'}${uploadDir ?? UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;
              if (!rootPath) {
                file.url = `public/${uploadDir ?? UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;
              } else {
              file.url = `http://localhost:1337/api/root-files/files${link}/${file.hash}${file.ext}`;
              }
              resolve();
            }
          );
        });
      },
      async upload(file: File): Promise<void> {
        if (!file.buffer) {
          return Promise.reject(new Error('Missing file buffer'));
        }

        const { buffer } = file;
        return new Promise(async (resolve, reject) => {
        const { uploadPath, link } = await getCurrentUploadPath();
        console.log('upload', uploadPath);
          // write file in public/assets folder
          fs.writeFile(path.join(uploadPath, `${file.hash}${file.ext}`), buffer, (err) => {
            if (err) {
              return reject(err);
            }

            // file.url = `/${rootPath ?? 'public'}${uploadDir ?? UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;
            if (!rootPath) {
              file.url = `public/${uploadDir ?? UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;
            } else {
            file.url = `http://localhost:1337/api/root-path/files${link}/${file.hash}${file.ext}`;
            }


            resolve();
          });
        });
      },
      isPrivate(): boolean {
        return false;
      },
      delete(file: File): Promise<string | void> {
        return new Promise(async (resolve, reject) => {
          const uploadPath = getUploadPathFromFile(file);
          // const filePath = path.join(uploadPath, `${file.hash}${file.ext}`);
          const filePath = uploadPath;

          if (!fs.existsSync(filePath)) {
            resolve("File doesn't exist");
            return;
          }

          // remove file from public/assets folder
          fs.unlink(filePath, (err) => {
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