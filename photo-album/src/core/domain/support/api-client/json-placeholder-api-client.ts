import type { Album } from "@/core/domain/entities/album";
import type { Photo } from "@/core/domain/entities/photo";
import type { Result } from "@/core/util/result";

/**
 * JSONPlaceholder APIの予期せぬエラー
 */
export class JsonPlaceholderApiUnexpectedError extends Error {
  override name = "JsonPlaceholderApiUnexpectedError" as const;
}

/**
 * JSONPlaceholder APIのシステムエラー
 */
export class JsonPlaceholderApiSystemError extends Error {
  override name = "JsonPlaceholderApiSystemError" as const;
}

/**
 * JSONPlaceholder APIのバリデーションエラー
 */
export class JsonPlaceholderApiValidationError extends Error {
  override name = "JsonPlaceholderApiValidationError" as const;
}

export type CommonJsonPlaceholderApiErrors =
  | JsonPlaceholderApiSystemError
  | JsonPlaceholderApiValidationError
  | JsonPlaceholderApiUnexpectedError;

export type JsonPlaceholderApiResult<T> = Result<
  T,
  CommonJsonPlaceholderApiErrors
>;

export type JsonPlaceholderApiProps = {
  path: string;
};

/**
 * JSONPlaceholder APIクライアント インターフェース
 *
 * @interface JsonPlaceholderApiClient
 */
export interface JsonPlaceholderApiClient {
  /**
   * JSONPlaceholder API の GETメソッド
   *
   * @param {JsonPlaceholderApiProps} params
   * @return {*}  {(JsonPlaceholderApiResult<Album | Photo>)}
   * @memberof JsonPlaceholderApiClient
   */
  get(params: JsonPlaceholderApiProps): JsonPlaceholderApiResult<Album | Photo>;
}
