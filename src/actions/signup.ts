'use server';

import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';

export async function signup(prevState: { error?: string } | undefined, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  const email = formData.get('email');
  const name = formData.get('name');

  try {
    const data = await universalFetcher(END_POINTS.auth.signup, {
      config: {
        method: 'POST',
        body: JSON.stringify({ username, password, email, name }),
      },
    });

    return { success: true, data: data };
  } catch (err: any) {
    console.log(err?.message, 'register error');
    return { error: err?.message ?? 'Something went wrong. Try again.' };
  }
}
