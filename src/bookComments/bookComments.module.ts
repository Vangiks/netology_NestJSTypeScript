import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentsGateway } from './bookComments.gateway';
import { BookCommentsService } from './bookComments.service';
import { BookComment, BookCommentModel } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentModel },
    ]),
  ],
  providers: [BookCommentsGateway, BookCommentsService],
})
export class BookCommentsModule {}
