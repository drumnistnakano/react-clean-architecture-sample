import { z } from "zod";

const AlbumSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
});

export type AlbumProps = z.infer<typeof AlbumSchema>;

export class Album {
  /**
   * ユーザーID
   *
   * @example 1
   */
  readonly userId: number;
  /**
   * アルバムID
   *
   * @example 1
   */
  readonly id: number;
  /**
   * アルバムのタイトル
   *
   * cspell:disable-next-line
   * @example "quidem molestiae enim"
   */
  readonly title: string;

  constructor(props: AlbumProps) {
    const parsed = AlbumSchema.parse(props);
    this.userId = parsed.userId;
    this.id = parsed.id;
    this.title = parsed.title;
  }
}
