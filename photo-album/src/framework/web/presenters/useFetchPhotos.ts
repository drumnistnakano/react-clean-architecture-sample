import type { FindPhotoUseCase } from "@/core/usecase/find-photo-use-case-impl";
import { FIND_PHOTO_USE_CASE } from "@/di-container/service-id";
import type { Container } from "inversify";

export const useFetchPhotos = async ({
  container,
  albumId,
}: {
  container: Container;
  albumId: string | null;
}) => {
  if (albumId == null) {
    throw new Error("Album ID is empty");
  }
  const findPhotoUseCase = container.get<FindPhotoUseCase>(FIND_PHOTO_USE_CASE);
  const result = await findPhotoUseCase(albumId);

  if (result.success === false) {
    throw new Error("ERROR: useFetchPhotos");
  }

  return result.data.photos;
};
