import { Link } from "react-router-dom";
import { INITIAL_LIMIT_VALUE, INITIAL_BREED_VALUE } from "@/utils/constants";

const Navbar = () => {
  return (
    <nav className="flex items-center p-4 text-black">
      <div className="flex-shrink-0">
        <Link to={"/"}>Logo</Link>
      </div>

      <ul className="flex flex-grow justify-center items-end gap-5">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link
            to={`/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${INITIAL_BREED_VALUE}`}
          >
            Cat Gallery
          </Link>
        </li>
      </ul>

      <div className="flex-shrink-0">
        <Link to={"/favorites"}>Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
