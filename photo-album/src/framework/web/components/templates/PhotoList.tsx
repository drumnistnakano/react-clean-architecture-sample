import { useContext } from "react";
import useSWR from "swr";
import { useFetchPhotos } from "../../presenters/useFetchPhotos";
import { DIContainerContext } from "../../util/container-context";
import { Loading } from "../molecules/Loading";
import { PhotoImage } from "../organisms/PhotoImage";
import * as styles from "./PhotoList.css";

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

  if (isPhotosLoading) return <Loading />;
  if (photosError) throw new Error(`loading photos: ${photosError.message}`);

  return (
    <div className={styles.photoList}>
      {photos.map((photo) => (
        <div key={photo.id} className={styles.photoCard}>
          <PhotoImage {...photo} />
          <div className={styles.photoTitle}>{photo.title}</div>
        </div>
      ))}
    </div>
  );
};
