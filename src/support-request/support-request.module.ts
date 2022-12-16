import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestController } from './support-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequestModel,
  MessageModel,
  SupportRequest,
  Message,
} from './model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestModel },
      { name: Message.name, schema: MessageModel },
    ]),
  ],
  providers: [SupportRequestService],
  controllers: [SupportRequestController],
})
export class SupportRequestModule {}
