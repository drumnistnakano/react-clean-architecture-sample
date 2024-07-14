export interface Photo {
  /**
   * アルバムID
   *
   * @example 1
   */
  albumId: number;

  /**
   * 写真ID
   *
   * @example 1
   */
  id: number;

  /**
   * 写真のタイトル
   *
   * cspell:disable-next-line
   * @example "accusamus beatae ad facilis cum similique qui sunt"
   */
  title: string;

  /**
   * 写真のURL
   *
   * @example "https://via.placeholder.com/600/92c952"
   */
  url: string;

  /**
   * サムネイルのURL
   *
   * @example "https://via.placeholder.com/150/92c952"
   */
  thumbnailUrl: string;
}