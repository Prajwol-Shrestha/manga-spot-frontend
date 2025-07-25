'use server';

import { getAccessTokenFromCookie } from './cookies';
import { baseURL, IFetcherConfig } from './fetcher';
import { redirect } from 'next/navigation';
import buildQueryParams from './buildQueryParams';
import { logout } from '@/helpers/logout';

export async function serverFetcher<T = unknown>(url: string, options?: IFetcherConfig): Promise<T> {
  const { queryParams, config } = options || {};
  const accessToken = await getAccessTokenFromCookie();
  const endpoint = new URL(`${baseURL}${url}`);

  if (queryParams) {
    const params = buildQueryParams(queryParams);
    endpoint.search = params.toString();
  }

  const response = await fetch(endpoint.toString(), {
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    ...config,
  });

  if (response.status === 401) {
    await logout();
    return redirect('/login');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}
