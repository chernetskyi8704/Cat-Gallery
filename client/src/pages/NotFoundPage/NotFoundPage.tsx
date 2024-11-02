import { Link } from "react-router-dom";
import {
  INITIAL_LIMIT_VALUE,
  INITIAL_PAGE_NUMBER,
  INITIAL_BREED_VALUE,
} from "@/utils/constants";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center grow">
      <h1 className="text-6xl font-bold text-inactive mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <p className="text-xl text-gray-700 mb-6">
        But don't be sad! Better choose your cat 🐾
      </p>
      <Link
        to={`/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${INITIAL_BREED_VALUE}&page=${INITIAL_PAGE_NUMBER}`}
        className="inline-block px-8 py-4 text-black font-medium bg-inactive border-2 border-transparent hover:bg-hover hover:border-active rounded-full shadow transition duration-300 ease-in-out"
      >
        View All Cats
      </Link>
    </div>
  );
};

export default NotFoundPage;
