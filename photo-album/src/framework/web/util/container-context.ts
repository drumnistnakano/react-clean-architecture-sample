import type { Container } from "inversify";
import { createContext } from "react";

export interface DIContainerContextType {
  container: Container;
}

export const DIContainerContext = createContext({} as DIContainerContextType);
