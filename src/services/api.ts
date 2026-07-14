import axios, { type AxiosRequestHeaders } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("skillhub_auth_token");
    if (token) {
      if (config.headers) {
        const headers = config.headers as AxiosRequestHeaders;
        headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
      }
    }
  }
  return config;
});

// Unpack error messages consistently across the app
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "An unexpected error occurred.";
    const err = new Error(message) as Error & { status?: number };
    err.status = error.response?.status;
    return Promise.reject(err);
  }
);
