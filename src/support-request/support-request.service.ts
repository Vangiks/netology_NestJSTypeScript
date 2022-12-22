import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPagination, TID } from 'src/types';
import { GetChatListParams, ISendMessageDto } from './dto';
import {
  Message,
  IDocumentMessage,
  SupportRequest,
  IDocumentSupportRequest,
} from './model';

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectModel(Message.name)
    private MessageModel: Model<IDocumentMessage>,
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<IDocumentSupportRequest>,
  ) {}

  async findSupportRequests(
    filters: GetChatListParams,
    select: string = '-__v',
    pagination: IPagination,
  ): Promise<Array<IDocumentSupportRequest>> {
    const query = this.SupportRequestModel.find(filters).select(select);
    query.skip(pagination.offset);
    query.populate([{ path: 'messages' }, { path: 'user' }]);
    query.limit(pagination.limit);

    return query;
  }

  async getMessages(supportRequest: TID) {
    const _supportRequest: IDocumentSupportRequest =
      await this.SupportRequestModel.findById(supportRequest).populate({
        path: 'messages',
        populate: 'author',
      });
    return _supportRequest.messages.map((message) => ({
      id: _supportRequest._id,
      createdAt: _supportRequest.createdAt,
      text: message.text,
      readAt: message.readAt,
      author: {
        id: message.author._id,
        name: message.author.name,
      },
    }));
  }

  async sendMessage(data: ISendMessageDto): Promise<IDocumentMessage> {
    const newMessage: IDocumentMessage = new this.MessageModel();

    newMessage.author = data.author;
    newMessage.sentAt = new Date();
    newMessage.text = data.text;

    await newMessage.save();
    await this.SupportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: { messages: newMessage._id },
    });

    return newMessage;
  }
}
