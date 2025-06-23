import { Link } from "react-router-dom";
import { navbarItems } from "../utils/constants";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full mb-10 z-20">
      <header className="flex justify-between items-center bg-[#0c1c3b] h-[60px] w-full px-11">
        <h1 className="sm:text-3xl text-xl font-bold">Mission to Mars</h1>
        <nav className="space-x-6 text-lg font-medium text-white hidden sm:flex">
          <Link to="/">Home</Link>
          <Link to="/explore-mars">Explore Mars</Link>
          <Link to="/trivia">Trivia</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <nav className="text-lg font-medium text-white sm:hidden flex">
          <DropdownMenu />
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
