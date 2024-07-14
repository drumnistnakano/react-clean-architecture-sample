export type Success<T> = {
  success: true;
  data: T;
};

export type Failure<E extends Error> = {
  success: false;
  error: E;
};

/**
 * 結果を表す型。成功の場合は `Success<T>`、失敗の場合は `Failure<E>`。
 *
 * @see https://stackoverflow.com/questions/65492464/typescript-never-type-condition
 * 
 * @template T 成功時のデータ型
 * @template E 失敗時のエラー型
 *
 * @example
 * 成功の場合
 * const successResult: Result<string, Error> = {
 *   success: true,
 *   data: "成功しました"
 * };
 *
 * @example
 * 失敗の場合
 * const failureResult: Result<string, Error> = {
 *   success: false,
 *   error: new Error("失敗しました")
 * };
 */
export type Result<T, E extends Error> = E[] extends never[]
  ? Success<T>
  : Success<T> | Failure<E>;
