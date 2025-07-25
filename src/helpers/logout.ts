import { END_POINTS } from '@/constants/endpoints';
import { deleteCookie } from '@/lib/cookies';
import universalFetcher from '@/lib/fetcher';
import useAuthStore from '@/stores/authStore';

export async function logout() {
  try {
    useAuthStore.getState().logout();
    const config: RequestInit = {
      method: 'POST',
    };
    await universalFetcher(END_POINTS.auth.logout, {
      config: config,
    });
    deleteCookie('accessToken');
  } catch (error) {
    console.log('logout failed.');
  }
}
