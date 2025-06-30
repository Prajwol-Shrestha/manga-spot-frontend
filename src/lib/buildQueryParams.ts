import { cleanObj } from './utils';

export default function buildQueryParams(query: Record<string, any>) {
  const params = new URLSearchParams();
  const cleanQuery = cleanObj(query);

  for (const key in cleanQuery) {
    const value = cleanQuery[key];

    // Handle arrays (e.g., tags[]=a&tags[]=b)
    if (Array.isArray(value)) {
      value.forEach((v) => {
        params.append(`${key}[]`, String(v));
      });
    }

    // Handle nested objects (e.g., order[title]=asc)
    else if (typeof value === 'object' && value !== null) {
      for (const nestedKey in value) {
        params.append(`${key}[${nestedKey}]`, String(value[nestedKey]));
      }
    }

    // Handle primitive values
    else {
      params.set(key, String(value));
    }
  }

  return params;
}

