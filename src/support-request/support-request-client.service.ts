import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/common';
import { SupportRequest, Message } from './model';
import { ICreateSupportRequest, ISupportRequestClientService } from './support-request.interface';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private MessageModel: Model<Message>,
  ) {}

  async createSupportRequest(
    data: ICreateSupportRequest,
  ): Promise<SupportRequest> {
    const newHotel: SupportRequest = new this.SupportRequestModel();
    const newMessage: Message = new this.MessageModel();

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
    return this.SupportRequestModel.findById<SupportRequest>(supportRequest)
      .populate<{ messages: Array<Message> }>({
        path: 'messages',
        match: { readAt: { $exists: false } },
      })
      .then((supportRequests) =>
        supportRequests.messages.filter(
          (message) =>
            message.author.toString() !== supportRequests.user.toString(),
        ),
      );
  }
}
