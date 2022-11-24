export interface IBookComment {
  bookId: string;
  comment: string;
}

export interface ICreateBookComment extends IBookComment {}
export interface IUpdateBookComment extends Partial<IBookComment> {}
