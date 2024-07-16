import { useParams } from "react-router-dom";
import { PhotoList } from "../components/templates/PhotoList";

export const PhotoPage = () => {
  const { albumId } = useParams<{ albumId: string }>();

  if (!albumId) {
    return <p>Invalid album ID</p>;
  }

  return (
    <div>
      <h2>Photos in Album {albumId}</h2>
      <PhotoList albumId={albumId} />
    </div>
  );
};
