export interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}

export interface ICreateBook extends IBook {}
export interface IUpdateBook extends Partial<IBook> {}
