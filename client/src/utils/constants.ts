export interface ILimitOption {
  id: number;
  value: string;
  label: string;
}

export const LIMIT_OPTIONS = [
  { id: 1, value: "10", label: "10 images" },
  { id: 2, value: "15", label: "15 images" },
  { id: 3, value: "20", label: "20 images" },
];

export const INITIAL_LIMIT_VALUE = LIMIT_OPTIONS[0];
export const INITIAL_BREED_VALUE = "All breeds";
export const INITIAL_PAGE_NUMBER = "1";

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;
