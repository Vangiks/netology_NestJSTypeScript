import { Module } from '@nestjs/common';
import { SupportRequestClientService } from './support-request-client.service';
import { SupportRequestService } from './support-request.service';
import { SupportRequestController } from './support-request.controller';
import { SupportRequestEmployeeService } from './support-request-employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequestModel,
  MessageModel,
  SupportRequest,
  Message,
} from './model';
import { SupportRequestGateway } from './support-request.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestModel },
      { name: Message.name, schema: MessageModel },
    ]),
  ],
  providers: [
    SupportRequestClientService,
    SupportRequestService,
    SupportRequestEmployeeService,
    SupportRequestGateway,
  ],
  controllers: [SupportRequestController],
})
export class SupportRequestModule {}
