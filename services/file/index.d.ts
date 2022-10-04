export interface IOptions {
  uniqueName: boolean;
}

export interface IFile {
  destination: string;
  filename: string | null;
  options: IOptions;
  storage: StorageEngine;

  upload: () => Multer;
  diskStorage: () => void;
}
