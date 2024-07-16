import { useNavigate } from "react-router-dom";
import { AlbumList } from "../components/templates/AlbumList";

export const AlbumPage = () => {
  const navigate = useNavigate();

  const handleSelectAlbum = (albumId: number) => {
    navigate(`/albums/${albumId}/photos`);
  };

  return (
    <div>
      <h1>📸 Albums 📸</h1>
      <AlbumList onSelectAlbum={handleSelectAlbum} />
    </div>
  );
};
