import type { AlbumRepository } from "@/core/domain/repository/album-repository";
import type { Logger } from "@/core/domain/support/logger";
import type { Result } from "@/core/util/result";
import { FindAlbumUseCaseResponseDto } from "./find-album-use-case-dto";

export class FindAlbumUseCaseByUnexpectedError extends Error {
  override name = "FindAlbumUseCaseByUnexpectedError" as const;
}

export type FindAlbumUseCaseResult = Result<
  FindAlbumUseCaseResponseDto,
  FindAlbumUseCaseByUnexpectedError
>;

export type FindAlbumUseCase = () => Promise<FindAlbumUseCaseResult>;

export const buildFindAlbumUseCase = ({
  albumRepository,
  logger,
}: {
  albumRepository: AlbumRepository;
  logger: Logger;
}): FindAlbumUseCase => {
  return async () => {
    logger.debug({ message: "use-case: find-album-use-case-impl" });

    const result = await albumRepository.findAll();

    if (result.success === false) {
      logger.error({
        message: "Unexpected error occurred in FindAlbumUseCase",
      });
      return {
        success: false,
        error: new FindAlbumUseCaseByUnexpectedError(),
      };
    }

    return {
      success: true,
      data: new FindAlbumUseCaseResponseDto({ albums: result.data }),
    };
  };
};
