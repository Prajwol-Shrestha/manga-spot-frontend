export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserWithToken extends IUser {
  accessToken: string;
}
