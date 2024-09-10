"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_link_1 = __importDefault(require("./storage-link"));
const target_link_1 = __importDefault(require("./target-link"));
exports.default = {
    'custom-upload': {
        schema: storage_link_1.default,
    },
    'target-link': {
        schema: target_link_1.default,
    }
};
