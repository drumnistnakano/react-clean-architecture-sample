import { Spinner } from "../atoms/Spinner";
import * as styles from "./Loading.css";

export const Loading = () => {
  return (
    <>
      <div className={styles.loading}>
        <Spinner />
      </div>
    </>
  );
};
