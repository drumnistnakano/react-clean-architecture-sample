import type { Album } from "@/core/domain/entities/album";
import type { Photo } from "@/core/domain/entities/photo";
import type {
  JsonPlaceholderApiClient,
  JsonPlaceholderApiProps,
  JsonPlaceholderApiResult,
} from "@/core/domain/support/api-client/json-placeholder-api-client";
import {
  JsonPlaceholderApiSystemError,
  JsonPlaceholderApiUnexpectedError,
  JsonPlaceholderApiValidationError,
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
      if (!this.validateResponse(data)) {
        throw new JsonPlaceholderApiValidationError(
          "Response validation failed",
        );
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      if (
        error instanceof JsonPlaceholderApiSystemError ||
        error instanceof JsonPlaceholderApiValidationError
      ) {
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

  private validateResponse(data: Album | Photo): data is Album | Photo {
    return data?.id !== undefined && data?.title !== undefined;
  }
}
