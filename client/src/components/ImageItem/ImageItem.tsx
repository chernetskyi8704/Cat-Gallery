import { IImageData } from "@/types/CatData";
import WishlistButton from "../WishlistButton/WishlistButton";
import { IFavoriteCat } from "@/types/IFavoriteCat";
import { INITIAL_BREED_VALUE } from "@/utils/constants";

interface IImageItemProps {
  image: IImageData;
  name?: string;
  vetstreet_url?: string;
  breedsValue?: string;
  handleImageClick?: (breedImageId: string) => void;
  breedId?: string;
  setFavoriteCats?: React.Dispatch<React.SetStateAction<IFavoriteCat[]>>;
}

const ImageItem = ({
  image,
  name,
  breedsValue,
  handleImageClick,
  breedId,
  setFavoriteCats,
}: IImageItemProps) => {
  const { id, url } = image;

  return (
    <li className="relative break-inside-avoid mb-7 pb-3 rounded-lg" key={id}>
      <img alt={name} src={url} className="w-full h-auto rounded-md" />
      {breedsValue === INITIAL_BREED_VALUE && (
        <div className="absolute inset-0 flex items-end justify-center">
          <p className="bg-gray-50 text-center p-2 rounded-md">{name}</p>
        </div>
      )}

      {breedId && breedsValue === INITIAL_BREED_VALUE && handleImageClick && (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              handleImageClick(breedId);
              console.log(1);
            }}
            className="text-gray-600 after:content-[''] after:absolute after:inset-0"
          />
        </div>
      )}

      <div className="w-[50px] h-[50px] absolute top-[8px] flex  items-center backdrop-blur-lg justify-center rounded-full right-[16px] z-20  bg-inactive bg-opacity-60">
        <WishlistButton
          catImageId={id}
          imageUrl={url}
          setFavoriteCats={setFavoriteCats}
        />
      </div>
    </li>
  );
};

export default ImageItem;
