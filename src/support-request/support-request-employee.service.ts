import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/common';
import { SupportRequest, Message } from './model';

@Injectable()
export class SupportRequestEmployeeService {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequest>,
  ) {}

  async getUnreadCount(supportRequest: TID): Promise<Array<Message>> {
    return this.SupportRequestModel.findById({
      _id: supportRequest,
    })
      .populate<{ messages: Array<Message> }>({
        path: 'messages',
        match: { readAt: { $exists: false } },
      })
      .then((supportRequests) =>
        supportRequests.messages.filter(
          (message) =>
            message.author.toString() === supportRequests.user.toString(),
        ),
      );
  }
}
