import { TID } from 'src/common';
import { IMessage } from '../message.interface';
import { ISupportRequest } from '../support-request.interface';

export interface ICreateSupportRequestDto {
  text: string;
}

export interface ISendMessageDto extends Pick<IMessage, 'author' | 'text'> {
  supportRequest: TID;
}

export interface IMarkMessagesAsReadDto extends Pick<ISupportRequest, 'user'> {
  supportRequest: TID;
  createdBefore: Date;
}

export interface GetChatListParams extends Pick<ISupportRequest, 'isActive'> {
  user?: TID;
}
