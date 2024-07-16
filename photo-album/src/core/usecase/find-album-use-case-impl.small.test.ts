import { AlbumRepositoryDummy } from "@/core/domain/repository/album-repository.dummy";
import { LoggerDummy } from "@/core/domain/support/logger/logger.dummy";
import { describe, expect, test } from "vitest";
import { AlbumRepositoryUnexpectedError } from "../domain/repository/album-repository";
import {
  FindAlbumUseCaseByUnexpectedError,
  buildFindAlbumUseCase,
} from "./find-album-use-case-impl";

describe("FindAlbumUseCase tests", () => {
  test("should return all albums on successful fetch", async () => {
    const findAlbumUseCase = buildFindAlbumUseCase({
      albumRepository: new AlbumRepositoryDummy({
        findAllReturnValue: {
          success: true,
          data: [
            { userId: 1, id: 1, title: "Album 1" },
            { userId: 2, id: 2, title: "Album 2" },
          ],
        },
      }),
      logger: new LoggerDummy(),
    });

    const result = await findAlbumUseCase();
    expect(result).toEqual({
      success: true,
      data: {
        albums: [
          { id: 1, title: "Album 1" },
          { id: 2, title: "Album 2" },
        ],
      },
    });
  });

  test("should return an error on fetch failure", async () => {
    const findAlbumUseCase = buildFindAlbumUseCase({
      albumRepository: new AlbumRepositoryDummy({
        findAllReturnValue: {
          success: false,
          error: new AlbumRepositoryUnexpectedError(),
        },
      }),
      logger: new LoggerDummy(),
    });

    const result = await findAlbumUseCase();
    expect(result).toEqual({
      success: false,
      error: new FindAlbumUseCaseByUnexpectedError(),
    });
  });

  test("should return empty array when no albums are found", async () => {
    const findAlbumUseCase = buildFindAlbumUseCase({
      albumRepository: new AlbumRepositoryDummy({
        findAllReturnValue: {
          success: true,
          data: [],
        },
      }),
      logger: new LoggerDummy(),
    });

    const result = await findAlbumUseCase();
    expect(result).toEqual({
      success: true,
      data: {
        albums: [],
      },
    });
  });
});
