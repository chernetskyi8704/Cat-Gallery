import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import List from "@/components/List/List";
import ImageItem from "@/components/ImageItem/ImageItem";
import {
  INITIAL_LIMIT_VALUE,
  INITIAL_BREED_VALUE,
  INITIAL_PAGE_NUMBER,
} from "@/utils/constants";
import { useFavoritesStore } from "@/stores/favorite-store";
import Pagination from "@/components/UI/pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const FavoritePage = () => {
  const {
    favoriteCats,
    paginatedCats,
    fetchFavoriteItems,
    totalFavoriteItemsCount,
    totalPagesCount,
    setPage,
  } = useFavoritesStore();

  const [searchParams] = useSearchParams();

  const currentLimitValue =
    searchParams.get("limit") || INITIAL_LIMIT_VALUE.value;

  const currentPageValue = searchParams.get("page") || INITIAL_PAGE_NUMBER;

  const navigate = useNavigate();

  const handleChangePageNumber = useCallback(
    (pageNumber: string) => {
      if (!pageNumber) return;
      navigate(`/favorites?limit=${currentLimitValue}&page=${pageNumber}`);
      setPage(pageNumber);
    },
    [navigate, currentLimitValue, setPage],
  );

  useEffect(() => {
    fetchFavoriteItems(currentLimitValue, currentPageValue);
  }, [fetchFavoriteItems, currentLimitValue, currentPageValue]);

  useEffect(() => {
    if (!paginatedCats.length && +currentPageValue > 1) {
      const prevPage = +currentPageValue - 1;
      navigate(`/favorites?limit=${currentLimitValue}&page=${prevPage}`);
    }
  }, [navigate, paginatedCats.length, currentPageValue, currentLimitValue]);

  return (
    <section className="flex flex-col grow">
      {favoriteCats.length ? (
        <>
          <header className="flex justify-between items-center py-6 w-full px-4 sm:px-8 md:px-14">
            <p>Your favorites cats</p>
            <p>In Favorites ({totalFavoriteItemsCount})</p>
          </header>

          <div className="flex-1 flex justify-center py-4 px-4 sm:px-8 md:px-14">
            <div
              className={` columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5`}
            >
              {paginatedCats.length > 0 && (
                <List
                  items={paginatedCats}
                  renderItems={(favoriteCat) => {
                    const image = {
                      id: favoriteCat.id,
                      url: favoriteCat.imageUrl,
                    };
                    return <ImageItem image={image} key={favoriteCat.id} />;
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center my-4">
            {favoriteCats.length && (
              <Pagination
                setCurrentPageNumber={handleChangePageNumber}
                totalPagesCount={totalPagesCount}
              />
            )}
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
            className="redirect-btn"
          >
            View All Cats
          </Link>
        </div>
      )}
    </section>
  );
};

export default FavoritePage;
