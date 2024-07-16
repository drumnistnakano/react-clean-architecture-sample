import { Suspense } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loading } from "../components/molecules/Loading";
import { AlbumPage } from "./AlbumPage";
import { PhotoPage } from "./PhotoPage";
import { ErrorBoundary } from "./error-page/ErrorBoundary";
import { GlobalSystemErrorPage } from "./error-page/GlobalErrorPage";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={GlobalSystemErrorPage}>
    <Outlet />
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <AlbumPage />
          </Suspense>
        ),
      },
      {
        path: "/albums/:albumId/photos",
        element: (
          <Suspense fallback={<Loading />}>
            <PhotoPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <AlbumPage />,
      },
    ],
  },
]);

export const Route = () => {
  return <RouterProvider router={router} />;
};
