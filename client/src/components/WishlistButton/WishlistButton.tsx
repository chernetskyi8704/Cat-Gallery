import { useEffect, useState } from "react";
import RedHeartImage from "/red-heart-icon.png";
import TransparentHeartImage from "/transparent-heart-icon.png";
import { IFavoriteCat } from "@/types/IFavoriteCat";
import { useFavoritesStore } from "@/stores/favorite-store.ts";
import { isAlreadyInFavorites } from "@/utils/wishlistButtonHelpers";

interface IWishlistButtonProps {
  catImageId: string;
  imageUrl: string;
  setFavoriteCats?: React.Dispatch<React.SetStateAction<IFavoriteCat[]>>;
}

const WishlistButton = ({ catImageId, imageUrl }: IWishlistButtonProps) => {
  const [isImageInFavorites, setIsImageInFavorites] = useState<boolean>(false);

  const { favoriteCats, addFavoriteItem, removeFavoriteItem } =
    useFavoritesStore();

  useEffect(() => {
    const isInFavorites = isAlreadyInFavorites(catImageId, favoriteCats);
    setIsImageInFavorites(isInFavorites);
  }, [catImageId, favoriteCats]);

  const handleToggleWishlist = () => {
    setIsImageInFavorites((prev) => !prev);

    if (isImageInFavorites) {
      removeFavoriteItem(catImageId);
    } else {
      addFavoriteItem({ id: catImageId, imageUrl });
    }
  };

  return (
    <button className="relative" onClick={handleToggleWishlist}>
      <img
        alt="Like button"
        src={isImageInFavorites ? RedHeartImage : TransparentHeartImage}
        width={32}
        height={32}
      />
    </button>
  );
};

export default WishlistButton;
