import type { Result } from "@/core/util/result";
import type { Photo } from "../entities/photo";

/**
 * Photo Repository 予期せぬエラー
 */
export class PhotoRepositoryUnexpectedError extends Error {
  override name = "PhotoRepositoryUnexpectedError" as const;
}

export class PhotoRepositoryNotFoundError extends Error {
  override name = "PhotoRepositoryNotFoundError" as const;
}

export class PhotoRepositoryApiResponseSchemaError extends Error {
  override name = "PhotoRepositoryApiResponseSchemaError" as const;
}

export type CommonPhotoRepositoryErrors =
  | PhotoRepositoryUnexpectedError
  | PhotoRepositoryNotFoundError
  | PhotoRepositoryApiResponseSchemaError;

export type FindPhotosByAlbumIdResult = Result<
  Photo[],
  CommonPhotoRepositoryErrors
>;

/**
 * Photo リポジトリインターフェース
 *
 * @interface PhotoRepository
 */
export interface PhotoRepository {
  /**
   * 指定されたアルバムIDの写真を取得します
   * @param {number} albumId
   * @return {*}  {Promise<FindPhotosByAlbumIdResult>}
   * @memberof PhotoRepository
   */
  findByAlbumId(albumId: number): Promise<FindPhotosByAlbumIdResult>;
}
