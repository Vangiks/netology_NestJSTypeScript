import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IPagination } from 'src/types';

export const Pagination = createParamDecorator(
  (data, ctx: ExecutionContext): IPagination | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();

    const pagination: IPagination = { limit: 0, offset: 0 };

    if (request.query.offset) {
      pagination.offset = parseInt(request.query.offset.toString());
    }

    if (request.query.limit) {
      pagination.limit = parseInt(request.query.limit.toString());
    }

    return pagination;
  },
);