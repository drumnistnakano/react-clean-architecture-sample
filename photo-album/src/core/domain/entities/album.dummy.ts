import { Album, type AlbumProps } from "./album";

export const albumDummyFrom = (props?: Partial<AlbumProps>): Album => {
  const defaultProps: AlbumProps = {
    userId: 1,
    id: 1,
    title: "Sample Album",
  };
  return new Album({ ...defaultProps, ...props });
};
