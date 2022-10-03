import { Schema, model, HydratedDocument } from 'mongoose';
import { IUser } from '../dto';

const usersSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  fullname: {
    type: String,
    default: '',
  },
  emails: [String],
});

type TDocumentUser = HydratedDocument<IUser>;

export { TDocumentUser };
export default model<IUser>('Users', usersSchema);
