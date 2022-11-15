import { MockModel } from '../../../database/test/model/mock.model';
import { Book } from '../../model';
import { bookStub } from '../stubs/book.stub';

export class BookModel extends MockModel<Book> {
  protected entityStub = bookStub();
}
