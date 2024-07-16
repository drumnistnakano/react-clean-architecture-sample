import { useContext } from "react";
import useSWR from "swr";
import { useFetchAlbums } from "../../presenters/useFetchAlbums";
import { DIContainerContext } from "../../util/container-context";
import { Loading } from "../molecules/Loading";
import * as styles from "./AlbumList.css";

interface AlbumListProps {
  onSelectAlbum: (albumId: number) => void;
}

export const AlbumList: React.FC<AlbumListProps> = ({ onSelectAlbum }) => {
  const { container } = useContext(DIContainerContext);

  const {
    data: albums,
    error: albumsError,
    isLoading: isAlbumsLoading,
  } = useSWR({ container }, useFetchAlbums, { suspense: true });

  if (isAlbumsLoading) return <Loading />;
  if (albumsError) throw new Error(`loading albums: ${albumsError.message}`);

  return (
    <div className={styles.albumList}>
      {albums.map((album) => (
        <button
          key={album.id}
          type="button"
          className={styles.albumCard}
          onClick={() => onSelectAlbum(album.id)}
        >
          <div className={styles.albumTitle}>
            {album.id}. {album.title}
          </div>
        </button>
      ))}
    </div>
  );
};
