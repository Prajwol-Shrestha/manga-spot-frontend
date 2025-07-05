import buildQueryParams from './buildQueryParams';

const baseURL = process.env.BASE_URL;

const defaultConfig: RequestInit = {
  cache: 'force-cache',
};

// @eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher(url: string, queryParams: Record<string, any> = {}, config: RequestInit = {}) {
  try {
    const params = buildQueryParams(queryParams);
    const endpoint = new URL(`${baseURL}${url}`);
    endpoint.search = params.toString();

    const response = await fetch(endpoint.toString(), {
      ...defaultConfig,
      ...config,
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error);
      throw new Error('An error occurred while fetching data.');
    }
  }
}
