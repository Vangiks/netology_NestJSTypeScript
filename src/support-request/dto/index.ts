import { TID } from 'src/types';
import { ISupportRequest, IMessage } from '../types';

export interface ICreateSupportRequestDto
  extends Pick<ISupportRequest, 'user'> {
  text: string;
}

export interface SendMessageDto extends Pick<IMessage, 'author' | 'text'> {
  supportRequest: TID;
}

export interface MarkMessagesAsReadDto extends Pick<ISupportRequest, 'user'> {
  supportRequest: TID;
  createdBefore: Date;
}
