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
export class SupportRequestClientService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<IDocumentSupportRequest>,
    @InjectModel(Message.name)
    private MessageModel: Model<IDocumentMessage>,
  ) {}

  async createSupportRequest(data): Promise<IDocumentSupportRequest> {
    const newHotel: IDocumentSupportRequest = new this.SupportRequestModel();
    const newMessage: IDocumentMessage = new this.MessageModel();

    const nowDate = new Date();

    newMessage.author = data.user;
    newMessage.sentAt = nowDate;
    newMessage.text = data.text;

    await newMessage.save();

    newHotel.messages.push(newMessage._id);
    newHotel.user = data.user;
    newHotel.isActive = true;
    newHotel.createdAt = nowDate;

    return newHotel.save();
  }

  async getUnreadCount(supportRequest: TID): Promise<Array<Message>> {
    const supportRequests = await this.SupportRequestModel.findById(
      supportRequest,
    ).populate({
      path: 'messages',
      match: { readAt: { $exists: false } },
    });
    return supportRequests.messages.filter(
      (message) =>
        message.author._id.toString() !== supportRequests.user._id.toString(),
    );
  }

  async markMessagesAsRead(params: IMarkMessagesAsReadDto): Promise<boolean> {
    const supportRequests = await this.SupportRequestModel.findById(
      params.supportRequest,
    ).populate({
      path: 'messages',
      match: {
        readAt: { $exists: false },
        author: { $ne: params.user },
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
