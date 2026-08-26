import axios from "axios";

const api = axios.create({
  baseURL: "https://api.smartcart.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const normalizedError = {
      message: error.response?.data?.message || error.message || "An unexpected error occurred",
      status: status || null,
      data: error.response?.data || null,
    };

    return Promise.reject(normalizedError);
  }
);

export default api;