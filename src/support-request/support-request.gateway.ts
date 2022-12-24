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
  GetUser,
} from 'src/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { SupportRequestClientGuard } from './support-request-client.guard';
import { User } from 'src/users/model';
import { SupportRequestService } from './support-request.service';
import { SupportRequestEmployeeService } from './support-request-employee.service';
import { SupportRequestClientService } from './support-request-client.service';

@WebSocketGateway({ cors: true })
export class SupportRequestGateway {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
    private readonly supportRequestClientService: SupportRequestClientService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard, SupportRequestClientGuard)
  @Roles(ERole.Manager, ERole.Client)
  @UseInterceptors(new ResponseInterceptor())
  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('subscribeToChat')
  handleGetMessage(@MessageBody() chatId: string) {
    return 'true';
  }

  //   @UseInterceptors(new ResponseInterceptor())
  //   @UseFilters(new WsExceptionFilter())
  //   @SubscribeMessage('getAllCommentsBook')
  //   handleGetAllCommentsBook(
  //     @MessageBody() bookId: string,
  //   ): Promise<Array<BookCommentDocument | null>> {
  //     return this.bookCommentsService.findAllBookComment(bookId);
  //   }

  //   @UseInterceptors(new ResponseInterceptor())
  //   @UseFilters(new WsExceptionFilter())
  //   @SubscribeMessage('addComment')
  //   async handleAddComment(
  //     @MessageBody(new BookCommentsValidationPipe(bookCommentCreateSchema))
  //     bookComment: ICreateBookComment,
  //   ): Promise<BookCommentDocument | null> {
  //     return await this.bookCommentsService.createBookComment(bookComment);
  //   }
}
