import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import CatGalleryPage from "./pages/CatGalleryPage/CatGalleryPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { initializeLocalStorageValue } from "./utils/localStorageHelpers";

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("fav_cats")) {
      initializeLocalStorageValue("fav_cats", []);
    }
  }, []);

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

  return <RouterProvider router={router} />;
};

export default App;
