import { IImageData } from "@/types/CatData";
import WishlistButton from "../WishlistButton/WishlistButton";
import { IFavoriteCat } from "@/types/IFavoriteCat";

interface IImageItemProps {
  image: IImageData;
  name?: string;
  vetstreet_url?: string;
  breedsValue?: string;
  setBreedValue?: React.Dispatch<React.SetStateAction<string>>;
  breedId?: string;
  setFavoriteCats?: React.Dispatch<React.SetStateAction<IFavoriteCat[]>>;
}

const ImageItem = ({
  image,
  name,
  breedsValue,
  setBreedValue,
  breedId,
  setFavoriteCats,
}: IImageItemProps) => {
  const { id, url } = image;

  return (
    <div className="relative break-inside-avoid mb-7 rounded-lg" key={id}>
      <img alt={name} src={url} className="w-full h-auto rounded-md" />
      {breedsValue === "All breeds" && (
        <div className="absolute -inset-2 flex items-end justify-center">
          <p className="bg-gray-50 text-center p-2 rounded-md">{name}</p>
        </div>
      )}

      {setBreedValue && breedId && (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setBreedValue(breedId)}
            className="text-gray-600 after:content-[''] after:absolute after:inset-0"
          />
        </div>
      )}

      <div className="absolute top-[20px] right-[20px] z-888">
        <WishlistButton
          catImageId={id}
          imageUrl={url}
          setFavoriteCats={setFavoriteCats}
        />
      </div>
    </div>
  );
};

export default ImageItem;
