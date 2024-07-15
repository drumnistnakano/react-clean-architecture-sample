import type { Photo } from "@/core/domain/entities/photo";
import { PhotoRepositoryUnexpectedError } from "@/core/domain/repository/photo-repository";
import {
  type JsonPlaceholderApiResponse,
  JsonPlaceholderApiUnexpectedError,
} from "@/core/domain/support/api-client";
import { JsonPlaceholderApiClientDummy } from "@/core/domain/support/api-client/json-placeholder-api-client.dummy";
import type { JsonPlaceholderApiClientDummyProps } from "@/core/domain/support/api-client/json-placeholder-api-client.dummy";
import { LoggerDummy } from "@/core/domain/support/logger/logger.dummy";
import type { Success } from "@/core/util/result";
import { describe, expect, it } from "vitest";
import { PhotoRepositoryImpl } from "./photo-repository-impl";

const setUpDependencies = ({
  getReturnValue,
}: { getReturnValue: JsonPlaceholderApiClientDummyProps["getReturnValue"] }): {
  photoRepository: PhotoRepositoryImpl;
} => {
  const logger = new LoggerDummy();
  const apiClient = new JsonPlaceholderApiClientDummy({ getReturnValue });
  const photoRepository = new PhotoRepositoryImpl(apiClient, logger);

  return { photoRepository };
};

describe("PhotoRepositoryImpl", () => {
  describe("findByAlbumId tests", () => {
    it("should return all photos for the given album ID on successful fetch", async () => {
      const { photoRepository } = setUpDependencies({
        getReturnValue: {
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
          ] as unknown as JsonPlaceholderApiResponse,
        },
      });

      const result = await photoRepository.findByAlbumId(1);

      expect(result.success).toBe(true);
      expect((result as Success<Photo[]>).data).toEqual([
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
      ]);
    });

    it("should return an error on fetch failure", async () => {
      const { photoRepository } = setUpDependencies({
        getReturnValue: {
          success: false,
          error: new JsonPlaceholderApiUnexpectedError(),
        },
      });

      const result = await photoRepository.findByAlbumId(1);

      expect(result).toEqual({
        success: false,
        error: new PhotoRepositoryUnexpectedError(),
      });
    });

    it("should return empty array when no photos are found", async () => {
      const { photoRepository } = setUpDependencies({
        getReturnValue: {
          success: true,
          data: [] as unknown as JsonPlaceholderApiResponse,
        },
      });

      const result = await photoRepository.findByAlbumId(1);

      expect(result).toEqual({
        success: true,
        data: [],
      });
    });
  });
});
