import type {
  JsonPlaceholderApiClient,
  JsonPlaceholderApiProps,
  JsonPlaceholderApiResult,
} from "@/core/domain/support/api-client/json-placeholder-api-client";
import {
  JsonPlaceholderApiSystemError,
  JsonPlaceholderApiUnexpectedError,
} from "@/core/domain/support/api-client/json-placeholder-api-client";

type JsonPlaceholderApiClientImplProps = {
  readonly apiUrl: string;
};

export class JsonPlaceholderApiClientImpl implements JsonPlaceholderApiClient {
  readonly #apiUrl: string;

  constructor({ apiUrl }: JsonPlaceholderApiClientImplProps) {
    this.#apiUrl = apiUrl;
  }

  async get(
    params: JsonPlaceholderApiProps,
  ): Promise<JsonPlaceholderApiResult> {
    // Update return type
    try {
      const response = await fetch(new URL(params.path, this.#apiUrl));
      if (!response.ok) {
        throw new JsonPlaceholderApiSystemError(
          `Failed to fetch: ${response.statusText}`,
        );
      }

      const data = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error) {
      if (error instanceof JsonPlaceholderApiSystemError) {
        return {
          success: false,
          error,
        };
      }
      return {
        success: false,
        error: new JsonPlaceholderApiUnexpectedError(
          "An unexpected error occurred",
        ),
      };
    }
  }
}
