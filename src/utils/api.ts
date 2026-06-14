import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

import { env } from "@/env";

const API_BASE_URL = env.apiBaseUrl;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          const message =
            (error.response.data as { message?: string })?.message ||
            "An error occurred";

          switch (status) {
            case 403:
              toast.error("You do not have permission to perform this action.");
              break;
            case 404:
              toast.error("Resource not found.");
              break;
            case 500:
              toast.error("Server error. Please try again later.");
              break;
            default:
              toast.error(message);
          }
        } else if (error.request) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("An unexpected error occurred.");
        }

        return Promise.reject(error);
      },
    );
  }

  public get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client
      .get<T, AxiosResponse<T>>(url, config)
      .then((response) => response.data);
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client
      .post<T, AxiosResponse<T>>(url, data, config)
      .then((response) => response.data);
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client
      .put<T, AxiosResponse<T>>(url, data, config)
      .then((response) => response.data);
  }

  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client
      .patch<T, AxiosResponse<T>>(url, data, config)
      .then((response) => response.data);
  }

  public delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client
      .delete<T, AxiosResponse<T>>(url, config)
      .then((response) => response.data);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
