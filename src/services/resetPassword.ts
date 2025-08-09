import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';

interface RequestResetPasswordResponse {
  message: string;
}

export async function requestResetPassword(email: string) {
  const res = await universalFetcher<RequestResetPasswordResponse>(END_POINTS.auth['request-reset-password'], {
    config: {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
  });
  return res;
}

export async function resetPassword(email: string, token: string, newPassword: string) {
  const res = await universalFetcher<RequestResetPasswordResponse>(END_POINTS.auth['reset-password'], {
    config: {
      method: 'POST',
      body: JSON.stringify({ email, token, newPassword }),
    },
  });
  return res;
}
