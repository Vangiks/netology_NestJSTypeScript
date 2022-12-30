import { IPagination, TID } from 'src/common';
import { User } from 'src/users/model';
import {
  GetChatListParams,
  IMarkMessagesAsReadDto,
  ISendMessageDto,
} from './dto';
import { Message, SupportRequest } from './model';
import { IMessage } from './message.interface';

export class ISupportRequest {
  user: TID;
  createdAt: Date;
  messages?: Array<TID>;
  isActive?: boolean;
}

export interface IFindSupportRequests
  extends Pick<ISupportRequest, 'createdAt' | 'isActive'> {
  id: TID;
  user: User;
}

export interface ICreateSupportRequest extends Pick<ISupportRequest, 'user'> {
  text: string;
}

export interface IGetMessages
  extends Pick<ISupportRequest, 'createdAt'>,
    Pick<IMessage, 'text' | 'readAt'> {
  id: TID;
  author: {
    id: TID;
    name: string;
  };
}

export interface ISupportRequestClientService {
  createSupportRequest(data: ICreateSupportRequest): Promise<SupportRequest>;
  getUnreadCount(supportRequest: TID): Promise<Array<Message>>;
}

export interface ISupportRequestEmployeeService {
  getUnreadCount(supportRequest: TID): Promise<Array<Message>>;
}

export interface ISupportRequestService {
  findSupportRequests(
    filters: GetChatListParams,
    select: string,
    pagination: IPagination,
  ): Promise<Array<IFindSupportRequests>>;
  sendMessage(data: ISendMessageDto): Promise<Message>;
  getMessages(supportRequest: TID): Promise<Array<IGetMessages>>;
  markMessagesAsRead(params: IMarkMessagesAsReadDto): Promise<boolean>;
}
