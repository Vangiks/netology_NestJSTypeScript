import { ERole } from 'src/common';

export interface IUser {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone?: string;
  role: ERole;
}
