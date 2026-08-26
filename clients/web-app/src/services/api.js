import axios from "axios";

const MAX_RETRIES = 2;
const INITIAL_RETRY_DELAY = 1000;

const api = axios.create({
  baseURL: "https://api.smartcart.com",
  timeout: 10000,
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

// Response interceptor with exponential backoff retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const status = response?.status;

    // Handle 401 Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }

      const normalizedError = {
        message: response?.data?.message || "Unauthorized access",
        status: 401,
        data: response?.data || null,
      };
      return Promise.reject(normalizedError);
    }

    // Determine if error is eligible for retry (network errors or 5xx server errors)
    const isTransientError = !status || (status >= 500 && status < 600);
    
    if (config && isTransientError) {
      config._retryCount = config._retryCount || 0;

      if (config._retryCount < MAX_RETRIES) {
        config._retryCount += 1;
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, config._retryCount - 1);

        await new Promise((resolve) => setTimeout(resolve, delay));
        return api(config);
      }
    }

    // Standardized error payload
    const normalizedError = {
      message: response?.data?.message || error.message || "An unexpected error occurred",
      status: status || null,
      data: response?.data || null,
      isNetworkError: !status,
    };

    return Promise.reject(normalizedError);
  }
);

export default api;