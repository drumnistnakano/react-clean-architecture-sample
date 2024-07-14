import type { Result } from "@/core/util/result";
import type { Album } from "../entities/album";

/**
 * Album Repository 予期せぬエラー
 */
export class AlbumRepositoryUnexpectedError extends Error {
  override name = "AlbumRepositoryUnexpectedError" as const;
}

export class AlbumRepositoryNotFoundError extends Error {
  override name = "AlbumRepositoryNotFoundError" as const;
}

export class AlbumRepositoryApiResponseSchemaError extends Error {
  override name = "AlbumRepositoryApiResponseSchemaError" as const;
}

export type CommonAlbumRepositoryErrors =
  | AlbumRepositoryUnexpectedError
  | AlbumRepositoryNotFoundError
  | AlbumRepositoryApiResponseSchemaError;

export type FindAllAlbumsResult = Result<Album[], CommonAlbumRepositoryErrors>;

/**
 * Album リポジトリインターフェース
 *
 * @interface AlbumRepository
 */
export interface AlbumRepository {
  /**
   * すべてのアルバムを取得します
   * @return {*}  {Promise<FindAllAlbumsResult>}
   * @memberof AlbumRepository
   */
  findAll(): Promise<FindAllAlbumsResult>;
}
