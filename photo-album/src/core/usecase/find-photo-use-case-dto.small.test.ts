import type { Photo } from "@/core/domain/entities/photo";
import { describe, expect, test } from "vitest";
import { FindPhotoUseCaseResponseDto } from "./find-photo-use-case-dto";

describe("FindPhotoUseCaseResponseDto tests", () => {
  test("should map Photo entities to PhotoInfo Dto", () => {
    const photos: Photo[] = [
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
    ];

    const dto = new FindPhotoUseCaseResponseDto({ photos });

    expect(dto.photos).toEqual([
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
    ]);
  });

  test("should handle empty photo array", () => {
    const photos: Photo[] = [];

    const dto = new FindPhotoUseCaseResponseDto({ photos });

    expect(dto.photos).toEqual([]);
  });
});
