import type { PhotoInfo } from "@/core/usecase/find-photo-use-case-dto";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as styles from "./PhotoImage.css";

export const PhotoImage: React.FC<PhotoInfo> = ({ thumbnailUrl, title }) => {
  return (
    <LazyLoadImage
      src={thumbnailUrl}
      alt={title}
      className={styles.photoImage}
    />
  );
};
