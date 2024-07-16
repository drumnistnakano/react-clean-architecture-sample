import { Layout } from "../atoms/Layout";
import * as styles from "./GlobalSystemErrorPageTemplate.css";

type GlobalSystemErrorPageTemplateProps = {
  onTopPageClick: () => void;
};

export const GlobalSystemErrorPageTemplate = ({
  onTopPageClick,
}: GlobalSystemErrorPageTemplateProps) => {
  return (
    <>
      <title>500 Internal Server Error</title>
      <Layout>
        <div className={styles.globalErrorPageWrapper}>
          <span className={styles.errorMessage}>System Error</span>
          <div>
            <button
              className={styles.errorButton}
              type="button"
              onClick={onTopPageClick}
            >
              Reload
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};
