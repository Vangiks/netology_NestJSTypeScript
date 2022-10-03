import { Schema, model, HydratedDocument } from 'mongoose';
import { IBook } from '../dto';

const booksSchema = new Schema<IBook>({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  authors: {
    type: String,
    default: '',
  },
  favorite: {
    type: Boolean,
    default: false,
    set: (value: string | boolean) => {
      let result = value;
      if (typeof value === 'string') {
        result = Boolean(value);
      }
      return result;
    },
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  fileBook: {
    type: String,
    default: '',
  },
  counter: {
    type: Number,
    default: 0,
  },
});

type TDocumentBook = HydratedDocument<IBook>;

export { TDocumentBook };
export default model<IBook>('Books', booksSchema);
