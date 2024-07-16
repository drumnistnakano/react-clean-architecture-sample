import type { FC } from "react";
import { GlobalSystemErrorPageTemplate } from "../../components/templates/GlobalSystemErrorPageTemplate";
import type { FallbackProps } from "./ErrorBoundary";

export const GlobalSystemErrorPage: FC<FallbackProps> = () => {
  return (
    <GlobalSystemErrorPageTemplate
      onTopPageClick={() => {
        window.location.href = "/";
      }}
    />
  );
};
