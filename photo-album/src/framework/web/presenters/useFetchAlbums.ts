import type { FindAlbumUseCase } from "@/core/usecase/find-album-use-case-impl";
import { FIND_ALBUM_USE_CASE } from "@/di-container/service-id";
import type { Container } from "inversify";

export const useFetchAlbums = async ({
  container,
}: { container: Container }) => {
  const findAlbumUseCase = container.get<FindAlbumUseCase>(FIND_ALBUM_USE_CASE);
  const result = await findAlbumUseCase();

  if (result.success === false) {
    throw new Error("ERROR: useFetchAlbums");
  }

  return result.data.albums;
};
