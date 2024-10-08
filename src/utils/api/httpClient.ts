import type { HttpResponse, RequestConfig } from "../../types";
import type { HttpClient } from "./types";

/**
 * A generic HTTP client implementation using the native `fetch` API.
 * Supports common HTTP methods and can add an authorization token to requests.
 */
export class BrowserHttpClient implements HttpClient {
  /**
   * Sends a generic HTTP request based on the provided configuration.
   *
   * @param config - The request configuration, including the URL, method, headers, and body.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  async request<T = any>(config: RequestConfig): Promise<HttpResponse<T>> {
    const response = await fetch(config.url, await this.addToken(config));
    return this.transformResponse<T>(response);
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
    return this.request<T>({ ...config, url, method: "GET" });
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
    return this.request<T>({
      ...config,
      url,
      method: "POST",
      body: JSON.stringify(data),
    });
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
    return this.request<T>({
      ...config,
      url,
      method: "PUT",
      body: JSON.stringify(data),
    });
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
    return this.request<T>({ ...config, url, method: "DELETE" });
  }

  /**
   * Adds authorization headers to the request if provided in the configuration.
   *
   * @param config - The request configuration which may include headers and authorization.
   * @returns A `RequestInit` object, ready to be used with the `fetch` API.
   */
  private async addToken(config?: RequestConfig): Promise<RequestInit> {
    return {
      ...config,
      headers: {
        ...config?.headers,
        ...(config?.authorization && { Authorization: config.authorization }),
      },
    };
  }

  /**
   * Transforms a `fetch` Response object into an `HttpResponse` object.
   *
   * @param response - The `fetch` Response object to be transformed.
   * @returns A promise that resolves to an `HttpResponse` object containing the response data, status, and headers.
   */
  private async transformResponse<T>(
    response: Response
  ): Promise<HttpResponse<T>> {
    const data = await response.json();
    return {
      data,
      status: response.status,
      headers: (() => {
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        return headers;
      })(),
    };
  }
}
