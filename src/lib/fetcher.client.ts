import { END_POINTS } from '@/constants/endpoints';
import { baseURL, IFetcherConfig } from './fetcher';
import buildQueryParams from './buildQueryParams';
import { logout } from '@/helpers/logout';

export async function clientFetcher(url: string, options?: IFetcherConfig) {
  try {
    const { queryParams, config } = options || {};
      const endpoint = new URL(`${baseURL}${url}`);
      
    if (queryParams) {
      const params = buildQueryParams(queryParams);
      endpoint.search = params.toString();
    }

    const response = await fetch(endpoint.toString(), {
      cache: 'force-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    if (response.status === 401) {
    //   await fetch(`${baseURL}${END_POINTS.auth.logout}`, {
    //     method: 'POST',
        //   });
        await logout()
      window.location.href = '/login';
    }
      
          if (!response.ok) {
      throw new Error('Failed to fetch data');
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
