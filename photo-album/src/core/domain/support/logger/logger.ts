/**
 * ロガーインターフェース
 *
 * @interface Logger
 */
export interface Logger {
  /**
   * プログラム内で起こっていることに関連するあらゆる情報
   *
   * @param {object} obj
   * @memberof Logger
   */
  debug(obj: object): void;
  /**
   * ユーザが開始したアクション等の情報
   *
   * @param {object} obj
   * @memberof Logger
   */
  info(obj: object): void;
  /**
   * 将来的にエラーになる可能性の状態
   *
   * @param {object} obj
   * @memberof Logger
   */
  warn(obj: object): void;
  /**
   * すべてのエラー状態
   *
   * @param {object} obj
   * @memberof Logger
   */
  error(obj: object): void;
}
