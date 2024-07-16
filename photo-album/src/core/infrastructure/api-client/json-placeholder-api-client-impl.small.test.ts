import {
  JsonPlaceholderApiSystemError,
  JsonPlaceholderApiUnexpectedError,
} from "@/core/domain/support/api-client/json-placeholder-api-client";
import { describe, expect, it, vi } from "vitest";
import { JsonPlaceholderApiClientImpl } from "./json-placeholder-api-client-impl";

describe("JsonPlaceholderApiClientImpl", () => {
  const apiUrl = "https://example.com";
  const client = new JsonPlaceholderApiClientImpl({ apiUrl });

  it("should return data on successful fetch", async () => {
    const mockResponse = { id: 1, title: "test" };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    ) as unknown as typeof fetch;

    const result = await client.get({ path: "/albums/1" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(mockResponse);
    }
  });

  it("should return system error on fetch failure", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      }),
    ) as unknown as typeof fetch;

    const result = await client.get({ path: "/albums/1" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(JsonPlaceholderApiSystemError);
    }
  });

  it("should return unexpected error on unknown error", async () => {
    globalThis.fetch = vi.fn(() => {
      throw new Error("Unknown error");
    }) as unknown as typeof fetch;

    const result = await client.get({ path: "/albums/1" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(JsonPlaceholderApiUnexpectedError);
    }
  });
});
