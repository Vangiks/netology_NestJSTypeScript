import multer, { StorageEngine } from 'multer';

import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';

import { IOptions, IFile } from './index.d';

@injectable()
class File implements IFile {
  destination: string;
  filename: string | null;
  options: IOptions;
  storage: StorageEngine;

  constructor(
    @unmanaged() destination: string,
    @unmanaged() filename: string | null = null,
    @unmanaged() options: IOptions = { uniqueName: true }
  ) {
    this.filename = filename;
    this.destination = destination;
    this.options = options;
  }

  diskStorage() {
    this.storage = multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, this.destination);
      },
      filename: (_req, file, cb) => {
        let name = file.originalname;
        if (this.filename) {
          name = this.filename;
        }
        if (this.options?.uniqueName) {
          name = `${Date.now()}-${name}`;
        }
        cb(null, name);
      },
    });
  }

  upload() {
    return multer({ storage: this.storage });
  }
}

export { File, IFile };
