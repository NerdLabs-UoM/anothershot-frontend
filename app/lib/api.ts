import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.backendTokens.accessToken) {
        console.log("session", session.backendTokens.accessToken);
        config.headers[
          "Authorization"
        ] = `Bearer ${session.backendTokens.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          toast.error("Bad request");
          break;
        case 401:
          toast.error("Unauthorized");
          break;
        case 403:
          toast.error("Forbidden");
          break;
        case 404:
          toast.error("Not found");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          toast.error("An error occurred");
      }
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error("Error setting up request");
    }
    return Promise.reject(error);
  }
);

export default api;
