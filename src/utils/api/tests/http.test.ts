import type { HttpResponse, RequestConfig } from "../../../types";
import { BrowserHttpClient } from "../httpClient";

describe("BrowserHttpClient", () => {
  const client = new BrowserHttpClient();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("should perform a GET request", async () => {
    const mockResponse = {
      data: { message: "Hello, world!" },
      status: 200,
      headers: { "content-type": "application/json" },
    };

    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse.data,
      headers: new Headers(mockResponse.headers),
    } as Response);

    const url = "https://api.example.com/test";
    const result: HttpResponse<any> = await client.get(url);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: {},
      url,
    });
    expect(result.data).toEqual(mockResponse.data);
    expect(result.status).toBe(mockResponse.status);
    expect(result.headers).toEqual(mockResponse.headers);
  });

  it("should perform a POST request with data", async () => {
    const mockResponse = {
      data: { id: 1, name: "John Doe" },
      status: 201,
      headers: { "content-type": "application/json" },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => mockResponse.data,
      headers: new Headers(mockResponse.headers),
    } as Response);

    const url = "https://api.example.com/users";
    const requestData = { name: "John Doe" };
    const result: HttpResponse<any> = await client.post(url, requestData);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {},
      url,
      body: JSON.stringify(requestData),
    });
    expect(result.data).toEqual(mockResponse.data);
    expect(result.status).toBe(mockResponse.status);
    expect(result.headers).toEqual(mockResponse.headers);
  });

  it("should add an Authorization header when provided in the config", async () => {
    const mockResponse = {
      data: { message: "Authorized" },
      status: 200,
      headers: { "content-type": "application/json" },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse.data,
      headers: new Headers(mockResponse.headers),
    } as Response);

    const url = "https://api.example.com/secure-data";
    const config: RequestConfig = {
      authorization: "Bearer token123",
    };
    const result: HttpResponse<any> = await client.get(url, config);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      authorization: "Bearer token123",
      headers: {
        Authorization: "Bearer token123",
      },
      url,
    });
    expect(result.data).toEqual(mockResponse.data);
    expect(result.status).toBe(mockResponse.status);
    expect(result.headers).toEqual(mockResponse.headers);
  });

  it("should handle a 404 error response gracefully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: "Not Found" }),
      headers: new Headers({ "content-type": "application/json" }),
    } as Response);

    const url = "https://api.example.com/unknown";

    try {
      await client.get(url);
    } catch (error: any) {
      expect(error.status).toBe(404);
      expect(error.data).toEqual({ error: "Not Found" });
    }
  });

  it("should perform a DELETE request", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => ({}),
      headers: new Headers(),
    } as Response);

    const url = "https://api.example.com/resource/1";
    const result: HttpResponse<any> = await client.delete(url);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "DELETE",
      headers: {},
      url,
    });
    expect(result.status).toBe(204);
    expect(result.data).toEqual({});
  });
});
