export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserWithToken extends IUser {
  accessToken: string;
}
