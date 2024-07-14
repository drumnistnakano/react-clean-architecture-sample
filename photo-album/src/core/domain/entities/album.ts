export interface Album {
  /**
   * ユーザーID
   *
   * @example 1
   */
  userId: number;

  /**
   * アルバムID
   *
   * @example 1
   */
  id: number;

  /**
   * アルバムのタイトル
   *
   * cspell:disable-next-line
   * @example "quidem molestiae enim"
   */
  title: string;
}