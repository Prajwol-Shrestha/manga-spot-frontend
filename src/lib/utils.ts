import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanObj(Obj: Record<string, any>) {
  const cleanObj: Record<string, any> = {};
  for (const [key, value] of Object.entries(Obj)) {
    if (value !== undefined && value !== null && value !== '') {
      cleanObj[key] = value;
    }
  }
  return cleanObj;
}

export function debounce<T extends (...args: any[]) => void>(func: T, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
  };

  return debounced;
}

export const isServer = () => {
  return typeof window === 'undefined';
}