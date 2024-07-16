import type { PhotoRepository } from "@/core/domain/repository/photo-repository";
import type { Logger } from "@/core/domain/support/logger";
import { FindPhotoUseCaseResponseDto } from "./find-photo-use-case-dto";

export class FindPhotoUseCaseByUnexpectedError extends Error {
  override name = "FindPhotoUseCaseByUnexpectedError" as const;
}

export type FindPhotoUseCase = (
  albumId: number,
) => Promise<FindPhotoUseCaseResponseDto>;

export const buildFindPhotoUseCase = ({
  photoRepository,
  logger,
}: {
  photoRepository: PhotoRepository;
  logger: Logger;
}): FindPhotoUseCase => {
  return async (albumId: number) => {
    try {
      const result = await photoRepository.findByAlbumId(albumId);
      if (!result.success) {
        throw result.error;
      }
      return new FindPhotoUseCaseResponseDto({ photos: result.data });
    } catch (error) {
      logger.error({
        message: "Unexpected error occurred in FindPhotoUseCase",
        error,
      });
      throw new FindPhotoUseCaseByUnexpectedError();
    }
  };
};
