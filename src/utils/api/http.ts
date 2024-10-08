/**
 * @module Utils
 * @category API Helpers
 */

import type { HttpResponse, RequestConfig } from "../../types";
import { BrowserHttpClient } from "./httpClient";
import type { HttpClient } from "./types";

/**
 * An abstract HTTP class that provides a high-level interface for making HTTP requests.
 * It uses a configurable HTTP client (e.g., `BrowserHttpClient`) that implements the `HttpClient` interface.
 * This allows flexibility to swap out the HTTP client as needed.
 */
export abstract class Http {
  private client: HttpClient;

  /**
   * Initializes a new instance of the `Http` class with a specified HTTP client.
   * If no client is provided, it defaults to using `BrowserHttpClient`.
   *
   * @param client - An instance of a class implementing the `HttpClient` interface.
   */
  constructor(client: HttpClient = new BrowserHttpClient()) {
    this.client = client;
  }

  /**
   * Sends a generic HTTP request based on the provided configuration.
   *
   * @param config - The request configuration including URL, method, headers, and body.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  async request<T = any>(config: RequestConfig): Promise<HttpResponse<T>> {
    return this.client.request<T>(config);
  }

  /**
   * Sends an HTTP GET request to the specified URL.
   *
   * @param url - The URL to send the GET request to.
   * @param config - (Optional) Additional configuration options for the request, such as headers.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  async get<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.client.get<T>(url, config);
  }

  /**
   * Sends an HTTP POST request with a JSON body.
   *
   * @param url - The URL to send the POST request to.
   * @param data - The JSON data to include in the body of the request.
   * @param config - (Optional) Additional configuration options for the request, such as headers.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  async post<T = any>(
    url: string,
    data?: T,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  /**
   * Sends an HTTP PUT request with a JSON body.
   *
   * @param url - The URL to send the PUT request to.
   * @param data - The JSON data to include in the body of the request.
   * @param config - (Optional) Additional configuration options for the request, such as headers.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  async put<T = any>(
    url: string,
    data?: T,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  /**
   * Sends an HTTP DELETE request to the specified URL.
   *
   * @param url - The URL to send the DELETE request to.
   * @param config - (Optional) Additional configuration options for the request, such as headers.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
