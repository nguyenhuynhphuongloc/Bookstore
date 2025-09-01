import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Hàm điều hướng nhận tham số là đường dẫn
export const handleHomeClick = (navigate: any, path: string) => {
  navigate.push(path); // Chuyển hướng đến đường dẫn
};
