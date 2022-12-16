import { TID } from 'src/types';

export interface IMessage {
  author: TID;
  sentAt: Date;
  text: string;
  readAt: Date;
}

export interface ISupportRequest {
  user: TID;
  createdAt: Date;
  messages: Array<IMessage>;
  isActive: boolean;
}

export interface IGetChatListParams {
  user: TID | null;
  isActive: boolean;
}
