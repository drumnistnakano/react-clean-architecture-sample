import type { AlbumRepository, FindAllAlbumsResult } from "./album-repository";

export type AlbumRepositoryDummyProps = {
  findAllReturnValue: FindAllAlbumsResult;
};

export class AlbumRepositoryDummy implements AlbumRepository {
  readonly #findAllReturnValue: FindAllAlbumsResult;

  constructor(props?: AlbumRepositoryDummyProps) {
    this.#findAllReturnValue = props?.findAllReturnValue ?? {
      success: true,
      data: [
        {
          userId: 1,
          id: 1,
          title: "dummy album",
        },
      ],
    };
  }

  async findAll(): Promise<FindAllAlbumsResult> {
    return this.#findAllReturnValue;
  }
}
