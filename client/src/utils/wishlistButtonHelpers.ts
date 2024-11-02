import { IFavoriteCat } from "@/types/IFavoriteCat";
import { getLocalStorage, setLocalStorageValue } from "./localStorageHelpers";

export function getFavoriteCatsFromLocalStorage() {
  const favCats = getLocalStorage("fav_cats");
  return favCats;
}

export function isAlreadyInFavorites(
  catImageId: string,
  favCatsArray: IFavoriteCat[],
) {
  const isAlreadyInFavorites = favCatsArray.some(
    (favCat: { id: string }) => favCat.id === catImageId,
  );

  return isAlreadyInFavorites;
}

export function addCatToFavorites(cat: { id: string; imageUrl: string }) {
  const favCats = getFavoriteCatsFromLocalStorage();
  const isAlreadyFavorite = isAlreadyInFavorites(cat.id, favCats);

  if (!isAlreadyFavorite) {
    favCats.push(cat);
    setLocalStorageValue("fav_cats", favCats);
  }
}

export function removeCatFromFavorites(
  catId: string,
  setFavoriteCats: React.Dispatch<React.SetStateAction<IFavoriteCat[]>>,
) {
  const favCats = getFavoriteCatsFromLocalStorage();

  const updatedFavCats = favCats.filter(
    (favCat: { id: string }) => favCat.id !== catId,
  );

  setFavoriteCats(updatedFavCats);
  setLocalStorageValue("fav_cats", updatedFavCats);
}
