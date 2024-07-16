import { registerContainer } from "@/di-container/register-container.ts";
import React from "react";
import { createRoot } from "react-dom/client";
import { Route } from "./pages/Route.tsx";
import { DIContainerContext } from "./util/container-context.ts";

const webAppEntryPoint = async () => {
  const container = registerContainer({});

  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <DIContainerContext.Provider value={{ container }}>
          <Route />
        </DIContainerContext.Provider>
      </React.StrictMode>,
    );
  }
};

webAppEntryPoint();
