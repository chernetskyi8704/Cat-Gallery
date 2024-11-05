import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "../components/layout/AppLayout";
import CatGalleryPage from "../pages/CatGalleryPage/CatGalleryPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { initializeLocalStorageValue } from "../utils/localStorageHelpers";
import { catsImagesApi } from "@/api/cats-images-api";
import { breedsApi } from "@/api/cats-breeds-api";

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("fav_cats")) {
      initializeLocalStorageValue("fav_cats", []);
    }
  }, []);

  queryClient.prefetchQuery(breedsApi.getBreedsQueryOptions());
  queryClient.prefetchQuery(catsImagesApi.getImagesQueryOptions({}));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/gallery", element: <CatGalleryPage /> },
        {
          path: "favorites",
          element: <FavoritePage />,
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
