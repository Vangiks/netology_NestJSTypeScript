import 'reflect-metadata';
import { injectable } from 'inversify';
import fetch from 'node-fetch';

import config from '../../config';
import { ICounter } from './index.d';

@injectable()
class CounterBook implements ICounter {
  host: string;

  constructor() {
    this.host = config.APP_COUNTER_BOOKS_HOST;
  }

  async icreaseCounter(bookId: string) {
    return await fetch(`${this.host}/counter/${bookId}/incr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => response.response);
  }

  async getCounter(bookId: string) {
    return await fetch(`${this.host}/counter/${bookId}`)
      .then((data) => {
        return data.json();
      })
      .then((response) => response.response);
  }
}

export { CounterBook, ICounter };
