"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_upload_1 = __importDefault(require("./custom-upload"));
const storage_target_1 = __importDefault(require("./storage-target"));
const storage_link_1 = __importDefault(require("./storage-link"));
exports.default = {
    'custom-upload': custom_upload_1.default,
    'storage-target': storage_target_1.default,
    'storage-link': storage_link_1.default,
};
