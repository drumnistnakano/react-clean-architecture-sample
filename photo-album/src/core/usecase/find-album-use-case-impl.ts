import type { AlbumRepository } from "@/core/domain/repository/album-repository";
import type { Logger } from "@/core/domain/support/logger";
import type { Result } from "@/core/util/result";
import { FindAlbumUseCaseResponseDto } from "./find-album-use-case-dto";

export class FindAlbumUseCaseByUnexpectedError extends Error {
  override name = "FindAlbumUseCaseByUnexpectedError" as const;
}

export type CommonFindAlbumUseCaseErrors = FindAlbumUseCaseByUnexpectedError;

export type FindAlbumUseCaseResult = Result<
  FindAlbumUseCaseResponseDto,
  CommonFindAlbumUseCaseErrors
>;

export type FindAlbumUseCase = () => Promise<FindAlbumUseCaseResult>;

export const buildFindAlbumUseCase =
  ({
    albumRepository,
    logger,
  }: {
    albumRepository: AlbumRepository;
    logger: Logger;
  }): FindAlbumUseCase =>
  async () => {
    logger.debug({ message: "use-case: find-album-use-case-impl" });

    try {
      const albums = await albumRepository.findAll();
      if (albums.success === false) {
        return {
          success: false,
          error: new FindAlbumUseCaseByUnexpectedError(),
        };
      }

      return {
        success: true,
        data: new FindAlbumUseCaseResponseDto({
          albums: albums.data,
        }),
      };
    } catch (error) {
      logger.error({
        message: "Unexpected error occurred in find-album-use-case",
        error,
      });
      return {
        success: false,
        error: new FindAlbumUseCaseByUnexpectedError(),
      };
    }
  };
