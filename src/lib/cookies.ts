'use server';

import { cookies } from 'next/headers';

export async function getCookies() {
  const cookieStore = await cookies();
  return cookieStore;
}

export async function getAccessTokenFromCookie() {
  const cookieStore = await getCookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  return accessToken;
}