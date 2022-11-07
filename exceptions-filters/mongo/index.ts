import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// import * as mongoose from 'mongoose';
// import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

@Catch(Error.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError, host: ArgumentsHost) {
    console.log(exception, MongoExceptionFilter);
  }
}
