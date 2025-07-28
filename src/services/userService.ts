import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IUser } from '@/types/user';

export async function getUser() {
  const data = await universalFetcher<IUser>(END_POINTS.user.me);
  return data;
}

interface IUpdateUser {
  name?: string;
  avatar?: string;
  password?: string;
}

export async function updateUser(input: IUpdateUser) {
  const config: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(input),
  };
  const data = await universalFetcher<IUser>(END_POINTS.user.me, {
    config,
  });
  return data;
}

export async function deleteUser() {
  const config: RequestInit = {
    method: 'DELETE',
  };
  const data = await universalFetcher<IUser>(END_POINTS.user.me, {
    config,
  });
  return data;
}
