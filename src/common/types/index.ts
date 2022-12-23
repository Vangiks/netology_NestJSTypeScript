import { ObjectId, Schema } from 'mongoose';
export * from './pagination.interface';
export * from './roles.enum';

export type TID = string | ObjectId | Schema.Types.ObjectId;
