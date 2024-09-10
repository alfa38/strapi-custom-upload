/// <reference types="node" />
import { CheckFileSizeOptions, IFile, InitOptions } from './types';
declare const _default: {
    init({ sizeLimit: providerOptionsSizeLimit }?: InitOptions): {
        checkFileSize(file: File, options: CheckFileSizeOptions): void;
        uploadStream(file: IFile): Promise<void>;
        upload(file: IFile): Promise<void>;
        isPrivate(): boolean;
        delete(file: IFile): Promise<string | void>;
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map