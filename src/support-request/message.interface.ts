import { TID } from 'src/common';

export interface IMessage {
  author: TID;
  sentAt: Date;
  text: string;
  readAt?: Date;
}