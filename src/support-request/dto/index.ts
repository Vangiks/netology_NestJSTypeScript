import { TID } from 'src/common';
import { Message, SupportRequest } from '../model';

export interface ICreateSupportRequestDto {
  text: string;
}

export interface ISendMessageDto extends Pick<Message, 'author' | 'text'> {
  supportRequest: TID;
}

export interface IMarkMessagesAsReadDto extends Pick<SupportRequest, 'user'> {
  supportRequest: TID;
  createdBefore: Date;
}

export interface GetChatListParams extends Pick<SupportRequest, 'isActive'> {
  user?: TID;
}
