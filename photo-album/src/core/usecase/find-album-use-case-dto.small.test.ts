import type { Album } from "@/core/domain/entities/album";
import { describe, expect, test } from "vitest";
import { FindAlbumUseCaseResponseDto } from "./find-album-use-case-dto";

describe("FindAlbumUseCaseResponseDto Tests", () => {
  test("should generate correct AlbumInfo list when given a list of albums", () => {
    const albums: Album[] = [
      { userId: 1, id: 1, title: "Album 1" },
      { userId: 2, id: 2, title: "Album 2" },
    ];

    const dto = new FindAlbumUseCaseResponseDto({ albums });

    expect(dto.albums).toEqual([
      { id: 1, title: "Album 1" },
      { id: 2, title: "Album 2" },
    ]);
  });

  test("should generate an empty AlbumInfo list when given an empty list of albums", () => {
    const albums: Album[] = [];

    const dto = new FindAlbumUseCaseResponseDto({ albums });

    expect(dto.albums).toEqual([]);
  });
});
