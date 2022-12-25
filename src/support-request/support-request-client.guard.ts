import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERole } from 'src/common';
import { User } from 'src/users/model';
import { SupportRequest } from './model';

@Injectable()
export class SupportRequestClientGuard implements CanActivate {
  constructor(
    @InjectModel(SupportRequest.name)
    private SupportRequestModel: Model<SupportRequest>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextType = context.getType();

    let user: User | null = null;
    let supportRequestId = null;

    if (contextType === 'http') {
      const request = context.switchToHttp().getRequest();
      user = request.user;
      supportRequestId = request.params.id;
    } else if (contextType === 'ws') {
      const executionContextHost = context.switchToWs();
      const client = executionContextHost.getClient();
      user = client.handshake.user;
      supportRequestId = String(executionContextHost.getData());
    }

    if (user.role === ERole.Client) {
      const supportRequest = await this.SupportRequestModel.findById(
        supportRequestId,
      );

      return supportRequest.user.toString() === user._id.toString();
    }

    return true;
  }
}
