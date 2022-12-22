import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERole } from 'src/users/types';
import { IDocumentSupportRequest, SupportRequest } from './model';

@Injectable()
export class SupportRequestClientGuard implements CanActivate {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<IDocumentSupportRequest>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const supportRequestId = request.params.id;
    
    if (user.role === ERole.Client) {
      const supportRequest = await this.SupportRequestModel.findById(
        supportRequestId,
      );

      return supportRequest.user._id.toString() === user._id?.toString();
    }

    return true;
  }
}
