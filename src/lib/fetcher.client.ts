import { baseURL, IFetcherConfig } from './fetcher';
import buildQueryParams from './buildQueryParams';
import { logout } from '@/helpers/logout';
import { getAccessTokenFromCookie } from './cookies';

export async function clientFetcher<T = unknown>(url: string, options?: IFetcherConfig): Promise<T> {
  const { queryParams, config } = options || {};
  const endpoint = new URL(`${baseURL}${url}`);
  const accessToken = await getAccessTokenFromCookie();

  if (queryParams) {
    const params = buildQueryParams(queryParams);
    endpoint.search = params.toString();
  }

  const response = await fetch(endpoint.toString(), {
    cache: 'force-cache',
    // credentials: 'include', // since FE is setting the cookie.. then it will only send the cookie to the same domain.. and BE is on different domain right now
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    ...config,
  });

  if (response.status === 401) {
    await logout();
    window.location.href = '/login';
  }

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}
