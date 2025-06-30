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
