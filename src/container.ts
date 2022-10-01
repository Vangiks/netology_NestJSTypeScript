import { Container } from 'inversify';
import { BooksService } from './books/books.service';
import { CounterBook, ICounter } from '../services/counter';
import { ETypeService } from './types';

const mainContainer = new Container();
mainContainer.bind(BooksService).toSelf();
mainContainer.bind<ICounter>(ETypeService.Counter).to(CounterBook);

export { mainContainer };
