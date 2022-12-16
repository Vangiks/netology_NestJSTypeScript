import { TID } from 'src/types';
import { Message, SupportRequest } from '../model';

export interface ICreateSupportRequestDto extends Pick<SupportRequest, 'user'> {
  text: string;
}

export interface ISendMessageDto extends Pick<Message, 'author' | 'text'> {
  supportRequest: TID;
}

export interface IMarkMessagesAsReadDto extends Pick<SupportRequest, 'user'> {
  supportRequest: TID;
  createdBefore: Date;
}
