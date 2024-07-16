import { useContext } from "react";
import useSWR from "swr";
import { useFetchAlbums } from "../../presenters/useFetchAlbums";
import { DIContainerContext } from "../../util/container-context";

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

  if (isAlbumsLoading) return <p>Loading albums...</p>;
  if (albumsError) return <p>Error loading albums: {albumsError.message}</p>;

  return (
    <ul>
      {albums.map((album) => (
        <button
          key={album.id}
          type="button"
          onClick={() => onSelectAlbum(album.id)}
        >
          {album.title}
        </button>
      ))}
    </ul>
  );
};
