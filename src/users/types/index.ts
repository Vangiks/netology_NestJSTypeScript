export enum ERole {
  Client = 'client',
  Admin = 'admin',
  Manager = 'manager',
}

export interface IUser {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: ERole;
}

export interface ISearchUserParams extends Omit<IUser, 'passwordHash' | 'role'> {
  limit: number;
  offset: number;
}
