import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  INITIAL_BREED_VALUE,
  INITIAL_LIMIT_VALUE,
  INITIAL_PAGE_NUMBER,
} from "@/utils/constants";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex items-center justify-center grow bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
    >
      <div
        className={`bg-white bg-opacity-80 rounded-lg p-10  text-center transform transition-transform duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-80 opacity-0"
        }`}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to the Cat Gallery!</h1>
        <p className="text-xl mb-6">Discover and enjoy your favorite cats.</p>
        <Link
          to={`/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${INITIAL_BREED_VALUE}&page=${INITIAL_PAGE_NUMBER}`}
          className="inline-block px-8 py-4 text-black font-medium bg-inactive border-2 border-transparent hover:bg-hover hover:border-active rounded-full shadow transition duration-300 ease-in-out"
        >
          View All Cats
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
