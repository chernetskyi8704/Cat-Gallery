import { useState, useEffect } from "react";
import RedHeartImage from "/public/red-heart-icon.png";
import TransparentHeartImage from "/transparent-heart-icon.png";
import {
  getFavoriteCatsFromLocalStorage,
  isAlreadyInFavorites,
  addCatToFavorites,
  removeCatFromFavorites,
} from "@/utils/wishlistButtonHelpers";
import { IFavoriteCat } from "@/types/IFavoriteCat";

interface IWishlistButtonProps {
  catImageId: string;
  imageUrl: string;
  setFavoriteCats?: React.Dispatch<React.SetStateAction<IFavoriteCat[]>>;
}

const WishlistButton = ({
  catImageId,
  imageUrl,
  setFavoriteCats,
}: IWishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    const favoriteCatsArray = getFavoriteCatsFromLocalStorage();
    const isCatImageInFavorites = isAlreadyInFavorites(
      catImageId,
      favoriteCatsArray,
    );
    setIsInWishlist(isCatImageInFavorites);
  }, [catImageId]);

  const handleToggleWishlist = async () => {
    setIsInWishlist((prev) => !prev);
    if (isInWishlist && setFavoriteCats) {
      removeCatFromFavorites(catImageId, setFavoriteCats);
    } else {
      addCatToFavorites({ id: catImageId, imageUrl });
    }
  };

  return (
    <button className="relative" onClick={handleToggleWishlist}>
      <img
        alt="Like button"
        src={isInWishlist ? RedHeartImage : TransparentHeartImage}
        width={32}
        height={32}
      />
    </button>
  );
};

export default WishlistButton;
