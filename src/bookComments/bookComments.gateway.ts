import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { BookCommentsService } from './bookComments.service';
import { BookCommentDocument } from './model';
import { ICreateBookComment } from './dto';
import { BookCommentsValidationPipe } from './validation';
import { bookCommentCreateSchema } from './validation/schema';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { WsExceptionFilter, ResponseInterceptor } from 'src/common';

@WebSocketGateway({ cors: true })
export class BookCommentsGateway {
  constructor(private bookCommentsService: BookCommentsService) {}

  @UseInterceptors(new ResponseInterceptor())
  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('getAllComments')
  handleGetAllComments(): Promise<Array<BookCommentDocument | null>> {
    return this.bookCommentsService.getComments();
  }

  @UseInterceptors(new ResponseInterceptor())
  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('getAllCommentsBook')
  handleGetAllCommentsBook(
    @MessageBody() bookId: string,
  ): Promise<Array<BookCommentDocument | null>> {
    return this.bookCommentsService.findAllBookComment(bookId);
  }

  @UseInterceptors(new ResponseInterceptor())
  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody(new BookCommentsValidationPipe(bookCommentCreateSchema))
    bookComment: ICreateBookComment,
  ): Promise<BookCommentDocument | null> {
    return await this.bookCommentsService.createBookComment(bookComment);
  }
}
