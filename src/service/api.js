import axios from "axios";
import { authProvider } from "./auth";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = authProvider.getAccessToken();

    if (token) {
      config.headers["Authorization"] = "bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
