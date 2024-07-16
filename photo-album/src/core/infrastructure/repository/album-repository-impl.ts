import type { Album } from "@/core/domain/entities/album";
import type {
  AlbumRepository,
  FindAllAlbumsResult,
} from "@/core/domain/repository/album-repository";
import { AlbumRepositoryUnexpectedError } from "@/core/domain/repository/album-repository";
import {
  type JsonPlaceholderApiClient,
  JsonPlaceholderApiSystemError,
} from "@/core/domain/support/api-client";
import type { Logger } from "@/core/domain/support/logger";

export class AlbumRepositoryImpl implements AlbumRepository {
  private readonly apiClient: JsonPlaceholderApiClient;
  private readonly logger: Logger;

  constructor(apiClient: JsonPlaceholderApiClient, logger: Logger) {
    this.apiClient = apiClient;
    this.logger = logger;
  }

  async findAll(): Promise<FindAllAlbumsResult> {
    try {
      const result = await this.apiClient.get({ path: "albums" });

      if (!result.success) {
        if (result.error instanceof JsonPlaceholderApiSystemError) {
          this.logger.error({
            message: "System error occurred while fetching albums",
            error: result.error,
          });
          return {
            success: false,
            error: new AlbumRepositoryUnexpectedError(result.error.message),
          };
        }

        this.logger.error({
          message: "Unexpected error occurred while fetching albums",
          error: result.error,
        });
        return {
          success: false,
          error: new AlbumRepositoryUnexpectedError(result.error.message),
        };
      }

      const albums = result.data as unknown as Album[];
      return { success: true, data: albums };
    } catch (error) {
      this.logger.error({
        message: "Unexpected error occurred while fetching albums",
        error,
      });
      return {
        success: false,
        error: new AlbumRepositoryUnexpectedError(
          "An unexpected error occurred",
        ),
      };
    }
  }
}
