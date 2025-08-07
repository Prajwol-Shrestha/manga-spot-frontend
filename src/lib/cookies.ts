'use server';

import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return null;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
  return null;
}

export async function getCookies() {
  const cookieStore = await cookies();
  return cookieStore;
}

export async function getAccessTokenFromCookie() {
  const cookieStore = await getCookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  return accessToken;
}
