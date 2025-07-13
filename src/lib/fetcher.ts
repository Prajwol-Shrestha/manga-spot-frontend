import { END_POINTS } from '@/constants/endpoints';
import buildQueryParams from './buildQueryParams';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const defaultConfig: RequestInit = {
  cache: 'force-cache',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
};

// @eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher(url: string, queryParams?: Record<string, any>, config: RequestInit = {}) {
  try {
    const endpoint = new URL(`${baseURL}${url}`);

    if (queryParams) {
      const params = buildQueryParams(queryParams);
      endpoint.search = params.toString();
    }

    const response = await fetch(endpoint.toString(), {
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config.headers,
        // Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = { message: 'Unknown error', statusCode: response.status };
      }

      if (response.status === 401) {
        await fetch(`${baseURL}${END_POINTS.auth.logout}`, { method: 'POST', credentials: 'include' });

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        throw new Error('Unauthorized - Redirecting to login');
      }

      throw new Error(errorBody.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
      throw new Error(error.message || 'An error occurred while fetching data.');
    }
  }
}
