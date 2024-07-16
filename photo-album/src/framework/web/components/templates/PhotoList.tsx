import { useContext } from "react";
import useSWR from "swr";
import { useFetchPhotos } from "../../presenters/useFetchPhotos";
import { DIContainerContext } from "../../util/container-context";

interface PhotoListProps {
  albumId: string;
}

export const PhotoList: React.FC<PhotoListProps> = ({ albumId }) => {
  const { container } = useContext(DIContainerContext);

  const {
    data: photos,
    error: photosError,
    isLoading: isPhotosLoading,
  } = useSWR({ container, albumId }, useFetchPhotos, {
    suspense: true,
  });

  if (isPhotosLoading) return <p>Loading photos...</p>;
  if (photosError) return <p>Error loading photos: {photosError.message}</p>;

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <p>{photo.title}</p>
        </div>
      ))}
    </div>
  );
};
