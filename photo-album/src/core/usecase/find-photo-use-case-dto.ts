import type { Photo } from "@/core/domain/entities/photo";

type PhotoInfo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export class FindPhotoUseCaseResponseDto {
  readonly photos: PhotoInfo[];

  constructor({ photos }: { photos: Photo[] }) {
    this.photos = photos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
    }));
  }
}
