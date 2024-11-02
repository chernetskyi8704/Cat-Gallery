import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavoriteCatsFromLocalStorage } from "@/utils/wishlistButtonHelpers";
import List from "@/components/List/List";
import { IFavoriteCat } from "@/types/IFavoriteCat";
import ImageItem from "@/components/ImageItem/ImageItem";
import {
  INITIAL_LIMIT_VALUE,
  INITIAL_BREED_VALUE,
  INITIAL_PAGE_NUMBER,
} from "@/utils/constants";

const FavoritePage = () => {
  const [favoriteCats, setFavoriteCats] = useState<IFavoriteCat[]>([]);

  useEffect(() => {
    const favoriteCats = getFavoriteCatsFromLocalStorage();
    setFavoriteCats(favoriteCats);
  }, []);

  return (
    <section className="flex flex-col grow">
      {favoriteCats.length ? (
        <>
          <header className="flex justify-between items-center py-6 w-full px-4 sm:px-8 md:px-14">
            <p>Your favorites cats</p>
            <p>In Favorites ({favoriteCats.length})</p>
          </header>

          <div className="flex-1 flex justify-center py-4 px-4 sm:px-8 md:px-14">
            <div
              className={` columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5`}
            >
              {favoriteCats.length > 0 && (
                <List
                  items={favoriteCats}
                  renderItems={(favoriteCat) => {
                    const image = {
                      id: favoriteCat.id,
                      url: favoriteCat.imageUrl,
                    };
                    return (
                      <ImageItem
                        image={image}
                        key={favoriteCat.id}
                        setFavoriteCats={setFavoriteCats}
                      />
                    );
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex grow flex-col items-center justify-center text-center rounded-lg ">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            You have no favorite cats yet 😿
          </h1>
          <p className="text-gray-600 mb-6">
            Find cats you love and add them to your favorites!
          </p>
          <Link
            to={`/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${INITIAL_BREED_VALUE}&page=${INITIAL_PAGE_NUMBER}`}
            className="inline-block px-8 py-4 text-black font-medium bg-inactive border-2 border-transparent hover:bg-hover hover:border-active rounded-full shadow transition duration-300 ease-in-out"
          >
            View All Cats
          </Link>
        </div>
      )}
    </section>
  );
};

export default FavoritePage;
