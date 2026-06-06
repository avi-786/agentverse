import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, type: string) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  if (type === "monthly") return `${formatted}/mo`;
  if (type === "yearly") return `${formatted}/yr`;
  return formatted;
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function parseJsonField<T>(value: string | T[]): T[] {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value as string) as T[];
  } catch {
    return [];
  }
}
