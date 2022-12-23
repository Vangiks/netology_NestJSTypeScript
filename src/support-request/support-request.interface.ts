import { TID } from 'src/common';
import { User } from 'src/users/model';

export class ISupportRequest {
  user: TID;
  createdAt: Date;
  messages?: Array<TID>;
  isActive?: boolean;
}

export interface IFindSupportRequests
  extends Pick<ISupportRequest, 'createdAt' | 'isActive'> {
  id: TID;
  user: User;
}
