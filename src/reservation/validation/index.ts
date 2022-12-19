import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { ObjectSchema } from 'joi';
  
  @Injectable()
  export class ReservationValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
  
    transform(value: any, metadata: ArgumentMetadata) {
      const result = this.schema.validate(value);
      if (result.error) {
        throw new BadRequestException(`Validation failed. ${result.error}`);
      }
      return result.value;
    }
  }
  