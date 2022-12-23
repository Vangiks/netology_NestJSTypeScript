import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/common';
import { IMarkMessagesAsReadDto } from './dto';
import { SupportRequest, Message } from './model';

@Injectable()
export class SupportRequestEmployeeService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private MessageModel: Model<Message>,
  ) {}

  async getUnreadCount(supportRequest: TID): Promise<Array<Message>> {
    const supportRequests = await this.SupportRequestModel.findById({
      _id: supportRequest,
    }).populate<{ messages: Array<Message> }>({
      path: 'messages',
      match: { readAt: { $exists: false } },
    });
    return supportRequests.messages.filter(
      (message) =>
        message.author.toString() === supportRequests.user.toString(),
    );
  }

  async markMessagesAsRead(params: IMarkMessagesAsReadDto): Promise<boolean> {
    return await this.SupportRequestModel.findById(params.supportRequest)
      .populate<{ messages: Array<Message> }>({
        path: 'messages',
        match: {
          readAt: { $exists: false },
          author: { $eq: params.user },
          sentAt: { $gt: params.createdBefore },
        },
      })
      .orFail()
      .then((supportRequests) => {
        supportRequests.messages.forEach(async (message) => {
          await this.MessageModel.updateOne(
            { _id: message._id },
            {
              $currentDate: { readAt: 'date' },
            },
          );
        });

        return true;
      });
  }
}
