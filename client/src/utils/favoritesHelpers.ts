import { IFavoriteCat } from "@/types/IFavoriteCat";
import { getLocalStorage, setLocalStorageValue } from "./localStorageHelpers";

export function getFavoriteCatsFromLocalStorage() {
  const favCats = getLocalStorage("fav_cats") || [];
  return favCats;
}

export function isAlreadyInFavorites(
  catImageId: string,
  favCatsArray: IFavoriteCat[],
) {
  const isAlreadyInFavorites = favCatsArray?.some(
    (favCat: { id: string }) => favCat.id === catImageId,
  );

  return isAlreadyInFavorites;
}

export function removeCatFromFavorites(catId: string) {
  const favCats = getFavoriteCatsFromLocalStorage();

  const updatedFavCats = favCats?.filter(
    (favCat: { id: string }) => favCat.id !== catId,
  );

  setLocalStorageValue("fav_cats", updatedFavCats);
}
