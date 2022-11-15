import { Book } from '../../model';

export const bookStub = (): Book => {
  return {
    authors: 'Ivan Vyduikin',
    title: 'Заголовок',
    description: 'Описание',
    favorite: true,
    counter: 0,
    fileBook: '../',
    fileCover: 'Обложка',
    fileName: 'Имя файла',
  };
};
