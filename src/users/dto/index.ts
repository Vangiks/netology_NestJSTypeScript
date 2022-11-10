export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ICreateUser extends IUser {}
export interface ISigninUser extends Pick<IUser, 'email' | 'password'> {}