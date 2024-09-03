/// <reference types="node" />
/// <reference types="node" />
import { ReadStream } from 'fs';
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
interface InitOptions {
    sizeLimit?: number;
    rootPath?: string;
    uploadDir?: string;
}
interface CheckFileSizeOptions {
    sizeLimit?: number;
}
declare const _default: {
    init({ sizeLimit: providerOptionsSizeLimit, rootPath, uploadDir }?: InitOptions): {
        checkFileSize(file: File, options: CheckFileSizeOptions): void;
        uploadStream(file: File): Promise<void>;
        upload(file: File): Promise<void>;
        isPrivate(): boolean;
        delete(file: File): Promise<string | void>;
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map