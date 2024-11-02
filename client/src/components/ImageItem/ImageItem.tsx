import { IImageData } from "@/types/CatData";

interface IImageItemProps {
  image: IImageData;
  name: string;
  vetstreet_url: string;
  breedsValue: string;
  setBreedValue: React.Dispatch<React.SetStateAction<string>>;
  breedId: string;
}

const ImageItem = ({
  image,
  name,
  breedsValue,
  setBreedValue,
  breedId,
}: IImageItemProps) => {
  const { id, url } = image;

  return (
    <div className="relative break-inside-avoid mb-7 rounded-lg p-2" key={id}>
      <img alt={name} src={url} className="w-full h-auto rounded-md" />
      {breedsValue === "All breeds" && (
        <div className="absolute inset-0 flex items-end justify-center">
          <p className=" bg-white border border-gray-300 text-center p-2 rounded-md">
            {name}
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => setBreedValue(breedId)}
          className="text-gray-600 after:content-[''] after:absolute after:inset-0"
        />
      </div>
    </div>
  );
};

export default ImageItem;
