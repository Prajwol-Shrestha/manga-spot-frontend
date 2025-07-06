'use server';

import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';
import { cookies } from 'next/headers';

export async function login(prevState: { error?: string } | undefined, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const data = await fetcher(END_POINTS.auth.login, undefined, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });


    const { accessToken, ...rest } = data;

    return { success: true, data: data };
  } catch (err) {
    console.log(err, 'login error');
    return { error: 'Something went wrong. Try again.' };
  }
}
