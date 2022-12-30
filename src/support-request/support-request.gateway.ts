import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  WsExceptionFilter,
  ResponseInterceptor,
  Roles,
  RolesGuard,
  ERole,
} from 'src/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { SupportRequestClientGuard } from './support-request-client.guard';
import { SupportRequestService } from './support-request.service';
import { IGetMessages } from './support-request.interface';

@WebSocketGateway({ cors: true })
export class SupportRequestGateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, SupportRequestClientGuard)
  @Roles(ERole.Manager, ERole.Client)
  @UseInterceptors(new ResponseInterceptor())
  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('subscribeToChat')
  handleGetMessage(
    @MessageBody() chatId: string,
  ): Promise<Array<IGetMessages>> {
    return this.supportRequestService.getMessages(chatId);
  }
}
