"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const stream_1 = require("stream");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils = __importStar(require("@strapi/utils"));
const { PayloadTooLargeError } = utils.errors;
const { kbytesToBytes, bytesToHumanReadable } = utils.file;
const UPLOADS_FOLDER_NAME = 'uploads';
const ensureDirectory = (uploadPath) => {
    const options = {
        mode: 0o2777 // crash with 0o2775
    };
    fs_extra_1.default.ensureDirSync(uploadPath, options);
};
const findFirstEntry = async (pluginId, query) => {
    const entries = await strapi.entityService.findMany(pluginId, query);
    if (!entries)
        return {};
    if (Array.isArray(entries)) {
        if (entries.length === 0) {
            return {};
        }
        else {
            return entries[0];
        }
    }
};
const getCurrentTarget = async () => {
    const selection = await findFirstEntry('plugin::custom-upload.target-link');
    return selection;
};
const getCurrentUploadPath = async () => {
    const root = strapi.dirs.app.root;
    const currentTarget = await getCurrentTarget();
    const { link } = await findFirstEntry('plugin::custom-upload.custom-upload', { where: { name: currentTarget } });
    const uploadPath = path_1.default.resolve(`${root}/files/${link}`);
    if (!fs_extra_1.default.pathExistsSync(uploadPath)) {
        ensureDirectory(uploadPath);
    }
    return { uploadPath, link };
};
const getUploadPathFromFile = (file) => {
    const url = file.url.split('?')[0];
    if (url.startsWith('public')) {
        return `${strapi.dirs.app.root}\\public\\${UPLOADS_FOLDER_NAME}\\${file.hash}${file.ext}`;
    }
    // const filePath = file.url.split('/').splice(2).join('\\').split('?')[0];
    const filePath = url.split('/').splice(2).reduce((prevValue, nextValue) => `${prevValue}/${nextValue}`);
    return `${strapi.dirs.app.root}\\files\\${filePath}`;
};
module.exports = {
    init({ sizeLimit: providerOptionsSizeLimit } = {}) {
        if (providerOptionsSizeLimit) {
            process.emitWarning('[deprecated] In future versions, "sizeLimit" argument will be ignored from upload.config.providerOptions. Move it to upload.config');
        }
        return {
            checkFileSize(file, options) {
                const { sizeLimit } = options ?? {};
                // TODO V5: remove providerOptions sizeLimit
                if (providerOptionsSizeLimit) {
                    if (kbytesToBytes(file.size) > providerOptionsSizeLimit)
                        throw new PayloadTooLargeError(`${file.name} exceeds size limit of ${bytesToHumanReadable(providerOptionsSizeLimit)}.`);
                }
                else if (sizeLimit) {
                    if (kbytesToBytes(file.size) > sizeLimit)
                        throw new PayloadTooLargeError(`${file.name} exceeds size limit of ${bytesToHumanReadable(sizeLimit)}.`);
                }
            },
            async uploadStream(file) {
                if (!file.stream) {
                    return Promise.reject(new Error('Missing file stream'));
                }
                const { stream } = file;
                return new Promise(async (resolve, reject) => {
                    const { uploadPath, link } = await getCurrentUploadPath();
                    (0, stream_1.pipeline)(stream, fs_extra_1.default.createWriteStream(path_1.default.join(uploadPath, `${file.hash}${file.ext}`)), (err) => {
                        if (err) {
                            return reject(err);
                        }
                        file.url = `custom-upload/root-files${link.startsWith('/') ? link : `/${link}`}/${file.hash}${file.ext}`;
                        resolve();
                    });
                });
            },
            async upload(file) {
                if (!file.buffer) {
                    return Promise.reject(new Error('Missing file buffer'));
                }
                const { buffer } = file;
                return new Promise(async (resolve, reject) => {
                    const { uploadPath, link } = await getCurrentUploadPath();
                    // write file in public/assets folder
                    fs_extra_1.default.writeFile(path_1.default.join(uploadPath, `${file.hash}${file.ext}`), buffer, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        file.url = `custom-upload/root-files${link.startsWith('/') ? link : `/${link}`}/${file.hash}${file.ext}`;
                        resolve();
                    });
                });
            },
            isPrivate() {
                return false;
            },
            delete(file) {
                return new Promise(async (resolve, reject) => {
                    const uploadPath = getUploadPathFromFile(file);
                    const filePath = uploadPath;
                    console.log(filePath);
                    if (!fs_extra_1.default.existsSync(filePath)) {
                        resolve("File doesn't exist");
                        return;
                    }
                    // remove file from the path
                    fs_extra_1.default.unlink(filePath, (err) => {
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
//# sourceMappingURL=index.js.map