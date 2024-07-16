import type { Album } from "@/core/domain/entities/album";

type AlbumInfo = {
  id: number;
  title: string;
};

export class FindAlbumUseCaseResponseDto {
  readonly albums: AlbumInfo[];

  constructor({ albums }: { albums: Album[] }) {
    this.albums = albums.map((album) => ({
      id: album.id,
      title: album.title,
    }));
  }
}
