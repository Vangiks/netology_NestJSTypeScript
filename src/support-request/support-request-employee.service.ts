import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/types';
import { IMarkMessagesAsReadDto } from './dto';
import {
  SupportRequest,
  IDocumentSupportRequest,
  Message,
  IDocumentMessage,
} from './model';

@Injectable()
export class SupportRequestEmployeeService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<IDocumentSupportRequest>,
    @InjectModel(Message.name)
    private MessageModel: Model<IDocumentMessage>,
  ) {}

  async getUnreadCount(supportRequest: TID): Promise<Array<Message>> {
    const supportRequests = await this.SupportRequestModel.findById({
      _id: supportRequest,
    }).populate({
      path: 'messages',
      match: { readAt: { $exists: false } },
    });
    return supportRequests.messages.filter(
      (message) =>
        message.author._id.toString() === supportRequests.user._id.toString(),
    );
  }

  async markMessagesAsRead(params: IMarkMessagesAsReadDto): Promise<boolean> {
    const supportRequests = await this.SupportRequestModel.findById(
      params.supportRequest,
    ).populate({
      path: 'messages',
      match: {
        readAt: { $exists: false },
        author: { $eq: params.user },
        sentAt: { $gt: params.createdBefore },
      },
    });

    supportRequests.messages.forEach(async (message) => {
      await this.MessageModel.updateOne(
        { _id: message._id },
        {
          $currentDate: { readAt: 'date' },
        },
      );
    });

    return true;
  }
}
