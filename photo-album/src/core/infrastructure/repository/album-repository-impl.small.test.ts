import type { Album } from "@/core/domain/entities/album";
import {
  AlbumRepositoryNotFoundError,
  AlbumRepositoryUnexpectedError,
} from "@/core/domain/repository/album-repository";
import {
  type JsonPlaceholderApiResponse,
  JsonPlaceholderApiUnexpectedError,
} from "@/core/domain/support/api-client";
import { JsonPlaceholderApiClientDummy } from "@/core/domain/support/api-client/json-placeholder-api-client.dummy";
import type { JsonPlaceholderApiClientDummyProps } from "@/core/domain/support/api-client/json-placeholder-api-client.dummy";
import { LoggerDummy } from "@/core/domain/support/logger/logger.dummy";
import type { Success } from "@/core/util/result";
import { describe, expect, it } from "vitest";
import { AlbumRepositoryImpl } from "./album-repository-impl";

const setUpDependencies = ({
  getReturnValue,
}: { getReturnValue: JsonPlaceholderApiClientDummyProps["getReturnValue"] }): {
  albumRepository: AlbumRepositoryImpl;
} => {
  const logger = new LoggerDummy();
  const apiClient = new JsonPlaceholderApiClientDummy({ getReturnValue });
  const albumRepository = new AlbumRepositoryImpl(apiClient, logger);

  return { albumRepository };
};

describe("AlbumRepositoryImpl", () => {
  describe("findAll tests", () => {
    it("should return all albums on successful fetch", async () => {
      const { albumRepository } = setUpDependencies({
        getReturnValue: {
          success: true,
          data: [
            { userId: 1, id: 1, title: "Album 1" },
            { userId: 2, id: 2, title: "Album 2" },
          ] as unknown as JsonPlaceholderApiResponse,
        },
      });

      const result = await albumRepository.findAll();

      expect(result.success).toBe(true);
      expect((result as Success<Album[]>).data).toEqual([
        { userId: 1, id: 1, title: "Album 1" },
        { userId: 2, id: 2, title: "Album 2" },
      ]);
    });

    it("should return an error on fetch failure", async () => {
      const { albumRepository } = setUpDependencies({
        getReturnValue: {
          success: false,
          error: new JsonPlaceholderApiUnexpectedError(),
        },
      });

      const result = await albumRepository.findAll();

      expect(result).toEqual({
        success: false,
        error: new AlbumRepositoryUnexpectedError(),
      });
    });

    it("should return empty array when no albums are found", async () => {
      const { albumRepository } = setUpDependencies({
        getReturnValue: {
          success: true,
          data: [] as unknown as JsonPlaceholderApiResponse,
        },
      });

      const result = await albumRepository.findAll();

      expect(result).toEqual({
        success: true,
        data: [],
      });
    });
  });
});
