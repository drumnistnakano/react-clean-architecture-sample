import type {
  FindPhotosByAlbumIdResult,
  PhotoRepository,
} from "./photo-repository";

export type PhotoRepositoryDummyProps = {
  findByAlbumIdReturnValue: FindPhotosByAlbumIdResult;
};

export class PhotoRepositoryDummy implements PhotoRepository {
  readonly #findByAlbumIdReturnValue: FindPhotosByAlbumIdResult;

  constructor(props?: PhotoRepositoryDummyProps) {
    this.#findByAlbumIdReturnValue = props?.findByAlbumIdReturnValue ?? {
      success: true,
      data: [],
    };
  }

  async findByAlbumId(_albumId: string): Promise<FindPhotosByAlbumIdResult> {
    return this.#findByAlbumIdReturnValue;
  }
}
