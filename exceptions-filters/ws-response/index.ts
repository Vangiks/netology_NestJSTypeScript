import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const status = exception.getError();
    const message = exception.message;

    const client: Socket = ctx.getClient();

    client.emit('error', {
      code: status,
      status: false,
      response: null,
      timestamp: new Date().toISOString(),
      errors: [message],
    });
  }
}
