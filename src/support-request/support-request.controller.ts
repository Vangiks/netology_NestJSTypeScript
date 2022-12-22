import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'decorators/pagination.decorator';
import { ParseObjectIdPipe } from 'pipes';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { IPagination } from 'src/types';
import { RolesGuard } from 'src/users/roles.guard';
import { ERole, Roles } from 'src/users/types';
import {
  GetChatListParams,
  ICreateSupportRequestDto,
  IMarkMessagesAsReadDto,
  ISendMessageDto,
} from './dto';
import { SupportRequestClientGuard } from './support-request-client.guard';
import { SupportRequestClientService } from './support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee.service';
import { SupportRequestService } from './support-request.service';
import { SupportRequestValidationPipe } from './validation';
import {
  findSupportRequestsSchema,
  markMessagesAsReadSchema,
} from './validation/schema';
@Controller()
export class SupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
    private readonly supportRequestClientService: SupportRequestClientService,
  ) {}

  // TODO Validation
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Get('client/support-requests')
  async getSupportRequestCurrentUser(
    @Query(new SupportRequestValidationPipe(findSupportRequestsSchema))
    params: { isActive: boolean },
    @Pagination() pagination: IPagination,
    @Req()
    request,
  ) {
    const user = request.user;
    const filter: GetChatListParams = {
      isActive: params.isActive,
      user,
    };
    const findSupportRequest =
      await this.supportRequestService.findSupportRequests(
        filter,
        'createdAt isActive',
        pagination,
      );
    return await Promise.all(
      findSupportRequest.map(async (supportRequest) => {
        const unreadMessages =
          await this.supportRequestClientService.getUnreadCount(
            supportRequest._id,
          );
        return {
          id: supportRequest._id,
          createdAt: supportRequest.createdAt,
          isActive: supportRequest.isActive,
          hasNewMessages: !!unreadMessages?.length,
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Manager)
  @Get('manager/support-requests')
  async getSupportRequest(
    @Query(new SupportRequestValidationPipe(findSupportRequestsSchema))
    params,
    @Pagination() pagination: IPagination,
  ) {
    const filter: GetChatListParams = {
      isActive: params.isActive,
    };
    const findSupportRequest =
      await this.supportRequestService.findSupportRequests(
        filter,
        'createdAt isActive',
        pagination,
      );

    return await Promise.all(
      findSupportRequest.map(async (supportRequest) => {
        const unreadMessages =
          await this.supportRequestEmployeeService.getUnreadCount(
            supportRequest._id,
          );
        return {
          id: supportRequest._id,
          createdAt: supportRequest.createdAt,
          isActive: supportRequest.isActive,
          hasNewMessages: !!unreadMessages.length,
          client: {
            id: supportRequest.user._id,
            name: supportRequest.user.name,
            email: supportRequest.user.email,
            contactPhone: supportRequest.user.contactPhone,
          },
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard, SupportRequestClientGuard)
  @Roles(ERole.Manager, ERole.Client)
  @Get('common/support-requests/:id/messages')
  async getAllMessagesSupportRequest(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ) {
    const messages = await this.supportRequestService.getMessages(id);
    return messages;
  }

  // TODO Validation
  @UseGuards(JwtAuthGuard, RolesGuard, SupportRequestClientGuard)
  @Roles(ERole.Manager, ERole.Client)
  @Post('common/support-requests/:id/messages')
  async sendMessageSupportRequest(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body()
    body,
    @Req()
    request,
  ) {
    const user = request.user;
    const data: ISendMessageDto = {
      author: user._id,
      supportRequest: id,
      text: body.text,
    };
    await this.supportRequestService.sendMessage(data);
    const messages = await this.supportRequestService.getMessages(id);
    return messages;
  }

  // TODO Validation
  @UseGuards(JwtAuthGuard, RolesGuard, SupportRequestClientGuard)
  @Roles(ERole.Manager, ERole.Client)
  @Post('common/support-requests/:id/messages/read')
  async markMessagesAsRead(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body(new SupportRequestValidationPipe(markMessagesAsReadSchema))
    body: { createdBefore: Date },
    @Req()
    request,
  ) {
    const user = request.user;
    const data: IMarkMessagesAsReadDto = {
      createdBefore: body.createdBefore,
      supportRequest: id,
      user: user,
    };

    let result = false;
    if (data.user.role === ERole.Client) {
      result = await this.supportRequestClientService.markMessagesAsRead(data);
    } else if (data.user.role === ERole.Manager) {
      result = await this.supportRequestEmployeeService.markMessagesAsRead(
        data,
      );
    }

    return { succes: result };
  }

  // TODO Validation
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Client)
  @Post('client/support-requests')
  async createSupportRequest(
    @Body() data: ICreateSupportRequestDto,
    @Req()
    request,
  ) {
    const user = request.user;
    const newCupportRequest = {
      user,
      text: data.text,
    };
    const newSupportrequest =
      await this.supportRequestClientService.createSupportRequest(
        newCupportRequest,
      );

    const unreadMessages =
      await this.supportRequestClientService.getUnreadCount(
        newSupportrequest._id,
      );
    return {
      id: newSupportrequest._id,
      createdAt: newSupportrequest.createdAt,
      isActive: newSupportrequest.isActive,
      hasNewMessages: !!unreadMessages.length,
    };
  }
}
