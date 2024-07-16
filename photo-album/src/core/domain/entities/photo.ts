import { z } from "zod";

const PhotoSchema = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
});

export type PhotoProps = z.infer<typeof PhotoSchema>;

export class Photo {
  /**
   * アルバムID
   *
   * @example 1
   */
  readonly albumId: number;
  /**
   * 写真ID
   *
   * @example 1
   */
  readonly id: number;
  /**
   * 写真のタイトル
   *
   * cspell:disable-next-line
   * @example "accusamus beatae ad facilis cum similique qui sunt"
   */
  readonly title: string;
  /**
   * 写真のURL
   *
   * @example "https://via.placeholder.com/600/92c952"
   */
  readonly url: string;
  /**
   * サムネイルのURL
   *
   * @example "https://via.placeholder.com/150/92c952"
   */
  readonly thumbnailUrl: string;

  constructor(props: PhotoProps) {
    const parsed = PhotoSchema.parse(props);
    this.albumId = parsed.albumId;
    this.id = parsed.id;
    this.title = parsed.title;
    this.url = parsed.url;
    this.thumbnailUrl = parsed.thumbnailUrl;
  }
}
