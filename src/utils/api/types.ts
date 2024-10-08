/**
 * @module Utils
 * @category API Helpers
 */

import type { HttpResponse, RequestConfig } from "../../types";

export interface HttpClient {
  request<T = any>(config: RequestConfig): Promise<HttpResponse<T>>;
  get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
  post<T = any>(
    url: string,
    data?: T,
    config?: RequestConfig
  ): Promise<HttpResponse<T>>;
  put<T = any>(
    url: string,
    data?: T,
    config?: RequestConfig
  ): Promise<HttpResponse<T>>;
  delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>>;
}
