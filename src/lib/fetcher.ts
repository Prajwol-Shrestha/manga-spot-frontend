import { serverFetcher } from './fetcher.server';
import { clientFetcher } from './fetcher.client';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export interface IFetcherConfig {
  queryParams?: Record<string, any>;
  config?: RequestInit;
}

export default async function universalFetcher(url: string, options?: IFetcherConfig) {
  if (typeof window === 'undefined') {
    return await serverFetcher(url, options);
  } else {
    return await clientFetcher(url, options);
  }
}
