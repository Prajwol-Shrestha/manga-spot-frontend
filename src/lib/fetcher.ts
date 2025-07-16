import { END_POINTS } from '@/constants/endpoints';
import buildQueryParams from './buildQueryParams';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

// Core fetcher with optional accessToken
export default async function fetcher<T = unknown>(
  url: string,
  {
    queryParams,
    config = {},
    accessToken,
  }: {
    queryParams?: Record<string, any>;
    config?: RequestInit;
    accessToken?: string;
  } = {}
): Promise<T> {
  try {
    const endpoint = new URL(`${baseURL}${url}`);

    if (queryParams) {
      const params = buildQueryParams(queryParams);
      endpoint.search = params.toString();
    }

    const response = await fetch(endpoint.toString(), {
      ...config,
      cache: 'force-cache',
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...(config.headers || {}),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
        // Auto logout and redirect (only client-side)
        if (typeof window !== 'undefined') {
          await fetch(`${baseURL}${END_POINTS.auth.logout}`, {
            method: 'POST',
            credentials: 'include',
          });
          window.location.href = '/login';
        }
        throw new Error('Unauthorized - Redirecting to login');
      }

      throw new Error(errorBody.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
      throw new Error(error.message || 'An error occurred while fetching data.');
    }
    throw error;
  }
}
