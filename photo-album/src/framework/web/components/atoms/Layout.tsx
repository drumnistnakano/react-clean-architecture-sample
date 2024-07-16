import type React from "react";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};
