import multer, { StorageEngine } from 'multer';

export interface IOptions {
  uniqueName: boolean;
}

class File {
  destination: string;
  filename: string | null;
  options: IOptions;
  storage: StorageEngine;

  constructor(
    destination: string,
    filename: string = null,
    options: IOptions = { uniqueName: true }
  ) {
    this.filename = filename;
    this.destination = destination;
    this.options = options;
    this.storage = multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, destination);
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

export default File;
