import { ReadStream } from 'fs';

export interface IFile {
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

export interface InitOptions {
  sizeLimit?: number;
  rootPath?: string,
  uploadDir?: string
}

export interface CheckFileSizeOptions {
  sizeLimit?: number;
}

export interface IWhereQuery {
  where: Record<string, unknown>,
}
