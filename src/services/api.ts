import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "An unexpected error occurred.";

    const err = new Error(message) as Error & {
      status?: number;
    };

    err.status = error.response?.status;

    return Promise.reject(err);
  }
);

export default api;