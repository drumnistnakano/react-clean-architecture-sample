import type { Photo } from "@/core/domain/entities/photo";
import type {
  FindPhotosByAlbumIdResult,
  PhotoRepository,
} from "@/core/domain/repository/photo-repository";
import { PhotoRepositoryUnexpectedError } from "@/core/domain/repository/photo-repository";
import {
  type JsonPlaceholderApiClient,
  JsonPlaceholderApiSystemError,
} from "@/core/domain/support/api-client";
import type { Logger } from "@/core/domain/support/logger";

export class PhotoRepositoryImpl implements PhotoRepository {
  private readonly apiClient: JsonPlaceholderApiClient;
  private readonly logger: Logger;

  constructor(apiClient: JsonPlaceholderApiClient, logger: Logger) {
    this.apiClient = apiClient;
    this.logger = logger;
  }

  async findByAlbumId(albumId: number): Promise<FindPhotosByAlbumIdResult> {
    try {
      const result = await this.apiClient.get({
        path: `/albums/${albumId}/photos`,
      });

      if (!result.success) {
        if (result.error instanceof JsonPlaceholderApiSystemError) {
          this.logger.error({
            message: "System error occurred while fetching photos",
            error: result.error,
          });
          return {
            success: false,
            error: new PhotoRepositoryUnexpectedError(result.error.message),
          };
        }

        this.logger.error({
          message: "Unexpected error occurred while fetching photos",
          error: result.error,
        });
        return {
          success: false,
          error: new PhotoRepositoryUnexpectedError(result.error.message),
        };
      }

      const photos = result.data as unknown as Photo[];
      return { success: true, data: photos };
    } catch (error) {
      this.logger.error({
        message: "Unexpected error occurred while fetching photos",
        error,
      });
      return {
        success: false,
        error: new PhotoRepositoryUnexpectedError(
          "An unexpected error occurred",
        ),
      };
    }
  }
}
