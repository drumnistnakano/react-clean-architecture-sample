import { PhotoRepositoryDummy } from "@/core/domain/repository/photo-repository.dummy";
import { LoggerDummy } from "@/core/domain/support/logger/logger.dummy";
import { describe, expect, test } from "vitest";
import {
  FindPhotoUseCaseByUnexpectedError,
  buildFindPhotoUseCase,
} from "./find-photo-use-case-impl";

describe("FindPhotoUseCase tests", () => {
  test("should return all photos for the given album ID on successful fetch", async () => {
    const findPhotoUseCase = buildFindPhotoUseCase({
      photoRepository: new PhotoRepositoryDummy({
        findByAlbumIdReturnValue: {
          success: true,
          data: [
            {
              albumId: 1,
              id: 1,
              title: "Photo 1",
              url: "https://via.placeholder.com/600/92c952",
              thumbnailUrl: "https://via.placeholder.com/150/92c952",
            },
            {
              albumId: 1,
              id: 2,
              title: "Photo 2",
              url: "https://via.placeholder.com/600/771796",
              thumbnailUrl: "https://via.placeholder.com/150/771796",
            },
          ],
        },
      }),
      logger: new LoggerDummy(),
    });

    const result = await findPhotoUseCase(1);
    expect(result).toEqual({
      photos: [
        {
          id: 1,
          title: "Photo 1",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          id: 2,
          title: "Photo 2",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
      ],
    });
  });

  test("should return an error on fetch failure", async () => {
    const findPhotoUseCase = buildFindPhotoUseCase({
      photoRepository: new PhotoRepositoryDummy({
        findByAlbumIdReturnValue: {
          success: false,
          error: {
            name: "PhotoRepositoryUnexpectedError",
            message: "Fetch error",
          },
        },
      }),
      logger: new LoggerDummy(),
    });

    await expect(findPhotoUseCase(1)).rejects.toThrow(
      FindPhotoUseCaseByUnexpectedError,
    );
  });

  test("should return empty array when no photos are found", async () => {
    const findPhotoUseCase = buildFindPhotoUseCase({
      photoRepository: new PhotoRepositoryDummy({
        findByAlbumIdReturnValue: {
          success: true,
          data: [],
        },
      }),
      logger: new LoggerDummy(),
    });

    const result = await findPhotoUseCase(1);
    expect(result).toEqual({
      photos: [],
    });
  });
});
