import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERole } from 'src/common';
import { SupportRequest } from './model';

@Injectable()
export class SupportRequestClientGuard implements CanActivate {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequest>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const supportRequestId = request.params.id;

    if (user.role === ERole.Client) {
      const supportRequest = await this.SupportRequestModel.findById(
        supportRequestId,
      );

      return supportRequest.user.toString() === user?.toString();
    }

    return true;
  }
}
