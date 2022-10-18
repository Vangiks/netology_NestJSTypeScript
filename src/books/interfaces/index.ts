import { IDocumentBook } from '../model';
import { Response } from 'express';

export interface IResponse<T> {
  errors: Array<string>;
  response: T | Array<T> | null;
  status: boolean;
}

export interface IBooksResponse extends Response<IResponse<IDocumentBook>> {}
