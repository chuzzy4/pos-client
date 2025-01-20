// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000/api", // Your backend base URL
// });

// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default apiClient;

import axios from "axios";

let handleSessionExpired: (() => void) | null = null;

export const setSessionExpiredHandler = (callback: () => void) => {
  handleSessionExpired = callback;
};

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Trigger the session expired handler if defined
      if (handleSessionExpired) {
        handleSessionExpired();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
