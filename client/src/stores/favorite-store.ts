import { create } from "zustand";
import { IFavoriteCat } from "@/types/IFavoriteCat";
import {
  getLocalStorage,
  setLocalStorageValue,
} from "@/utils/localStorageHelpers";
import { removeCatFromFavorites } from "@/utils/favoritesHelpers";

export type IFavoriteStore = {
  favoriteCats: IFavoriteCat[];
  paginatedCats: IFavoriteCat[];
  totalPagesCount: number;
  totalFavoriteItemsCount: number;
  currentPage: string;
  fetchFavoriteItems: (limit: string, currentPage: string) => void;
  addFavoriteItem: (catData: IFavoriteCat) => void;
  removeFavoriteItem: (catItemId: string) => void;
  setPage: (page: string) => void;
};

export const useFavoritesStore = create<IFavoriteStore>()((set) => ({
  favoriteCats: [],
  paginatedCats: [],
  totalFavoriteItemsCount: 0,
  totalPagesCount: 0,
  currentPage: "1",

  fetchFavoriteItems: (limit, page) => {
    const data = getLocalStorage("fav_cats");

    const offset = (+page - 1) * +limit;
    const paginatedCats = data?.slice(offset, offset + limit);
    const totalImagesCount = data?.length;
    const totalPagesCount = Math.ceil(totalImagesCount / +limit);

    set({
      favoriteCats: data,
      paginatedCats: paginatedCats,
      totalFavoriteItemsCount: data.length,
      totalPagesCount,
    });
  },

  addFavoriteItem: (catData) => {
    set((state) => {
      const updatedFavorites = [...state.favoriteCats, catData];
      setLocalStorageValue("fav_cats", updatedFavorites);

      return {
        favoriteCats: updatedFavorites,
      };
    });
  },

  removeFavoriteItem: (catId) => {
    set((state) => {
      const updatedFavorites = state.favoriteCats.filter(
        (cat) => cat.id !== catId,
      );
      const updatedPaginated = state.paginatedCats.filter(
        (cat) => cat.id !== catId,
      );
      removeCatFromFavorites(catId);
      return {
        favoriteCats: updatedFavorites,
        paginatedCats: updatedPaginated,
      };
    });
  },
  setPage: (page) => {
    set({ currentPage: page });
  },
}));
