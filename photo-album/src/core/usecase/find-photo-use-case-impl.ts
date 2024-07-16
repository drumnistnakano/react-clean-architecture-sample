import type { PhotoRepository } from "@/core/domain/repository/photo-repository";
import type { Logger } from "@/core/domain/support/logger";
import type { Result } from "../util/result";
import { FindPhotoUseCaseResponseDto } from "./find-photo-use-case-dto";

export class FindPhotoUseCaseByUnexpectedError extends Error {
  override name = "FindPhotoUseCaseByUnexpectedError" as const;
}

export type FindPhotoUseCaseResult = Result<
  FindPhotoUseCaseResponseDto,
  FindPhotoUseCaseByUnexpectedError
>;

export type FindPhotoUseCase = (
  albumId: string,
) => Promise<FindPhotoUseCaseResult>;

export const buildFindPhotoUseCase = ({
  photoRepository,
  logger,
}: {
  photoRepository: PhotoRepository;
  logger: Logger;
}): FindPhotoUseCase => {
  return async (albumId: string) => {
    logger.debug({ message: "use-case: find-photo-use-case-impl" });

    const result = await photoRepository.findByAlbumId(albumId);

    if (result.success === false) {
      logger.error({
        message: "Unexpected error occurred in FindPhotoUseCase",
      });
      return {
        success: false,
        error: new FindPhotoUseCaseByUnexpectedError(),
      };
    }

    return {
      success: true,
      data: new FindPhotoUseCaseResponseDto({ photos: result.data }),
    };
  };
};
