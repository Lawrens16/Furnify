import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeProductName(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}
