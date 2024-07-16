import type { Photo } from "./photo";

export const photoDummyFrom = (props?: Partial<Photo>): Photo => ({
  albumId: 1,
  id: 1,
  title: "Sample Photo",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952",
  ...props,
});
