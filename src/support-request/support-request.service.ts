import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPagination, TID } from 'src/common';
import { User } from 'src/users/model';
import { GetChatListParams, ISendMessageDto } from './dto';
import { Message, SupportRequest } from './model';
import { IFindSupportRequests } from './support-request.interface';

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectModel(Message.name)
    private MessageModel: Model<Message>,
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequest>,
  ) {}

  async findSupportRequests(
    filters: GetChatListParams,
    select: string = '-__v',
    pagination: IPagination,
  ): Promise<Array<IFindSupportRequests>> {
    const query = this.SupportRequestModel.find(filters).select(select);
    query.skip(pagination.offset);
    return query
      .populate<{ user: User }>('user')
      .limit(pagination.limit)
      .orFail()
      .then((findSupportRequests) =>
        findSupportRequests.map((findSupportRequest) => ({
          id: findSupportRequest._id,
          createdAt: findSupportRequest.createdAt,
          isActive: findSupportRequest.isActive,
          user: findSupportRequest.user,
        })),
      );
  }

  async getMessages(supportRequest: TID) {
    return await this.SupportRequestModel.findById(supportRequest)
      .populate<{
        messages: Array<Message & { author: User }>;
      }>({
        path: 'messages',
        populate: 'author',
      })
      .orFail()
      .then((supportRequest) =>
        supportRequest.messages.map((message) => ({
          id: supportRequest._id,
          createdAt: supportRequest.createdAt,
          text: message.text,
          readAt: message.readAt,
          author: {
            id: message.author._id,
            name: message.author.name,
          },
        })),
      );
  }

  async sendMessage(data: ISendMessageDto): Promise<Message> {
    const newMessage: Message = new this.MessageModel();

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
