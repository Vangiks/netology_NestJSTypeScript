import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_ANONYMOUS_META_KEY } from 'decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private isAnonymousAllowed: boolean;

  constructor(private reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    const isAnonymousAllowed =
      this.reflector.get<boolean>(
        ALLOW_ANONYMOUS_META_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<boolean>(ALLOW_ANONYMOUS_META_KEY, context.getClass());

    this.isAnonymousAllowed = isAnonymousAllowed;

    return super.canActivate(context);
  }

  public handleRequest(err, user, info) {
    if (err) {
      throw err;
    }
    if (!user && !this.isAnonymousAllowed) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
