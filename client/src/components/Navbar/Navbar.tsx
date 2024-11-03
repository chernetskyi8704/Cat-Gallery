import { Link } from "react-router-dom";
import {
  INITIAL_LIMIT_VALUE,
  INITIAL_BREED_VALUE,
  INITIAL_PAGE_NUMBER,
} from "@/utils/constants";
import FavoritesIconImage from "/red-heart-icon.png";

const Navbar = () => {
  return (
    <nav className="flex items-center py-4 text-black">
      <div className="flex-shrink-0">
        <Link to={"/"}>Logo</Link>
      </div>

      <ul className="flex flex-grow justify-center items-end gap-5">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link
            to={`/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${INITIAL_BREED_VALUE}&page=${INITIAL_PAGE_NUMBER}`}
          >
            Cat Gallery
          </Link>
        </li>
      </ul>

      <div className="flex-shrink-0">
        <Link to={"/favorites"}>
          <img
            src={FavoritesIconImage}
            width={25}
            height={25}
            alt="Favorites"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
