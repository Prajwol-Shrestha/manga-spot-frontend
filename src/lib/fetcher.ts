import { serverFetcher } from './fetcher.server';
import { clientFetcher } from './fetcher.client';
import { IQueryParams } from '@/types/common';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export interface IFetcherConfig {
  queryParams?: IQueryParams;
  config?: RequestInit;
}

export default async function universalFetcher<T = unknown>(url: string, options?: IFetcherConfig): Promise<T> {
  if (typeof window === 'undefined') {
    return await serverFetcher<T>(url, options);
  } else {
    return await clientFetcher<T>(url, options);
  }
}
