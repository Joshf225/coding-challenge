import { Link } from "react-router-dom";
import { WelcomeParagraph } from "../utils/constants";

function Home() {
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md max-w-xl w-full">
      <div className="bg-[#0c1c3b] rounded-t-xl h-[60px]"></div>
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to
          <br />
          Mission to Mars
        </h2>
        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          {WelcomeParagraph}
        </p>
        <div className="flex items-center justify-center gap-5">
          <Link
            className="bg-[#1d3e8a] text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-[#15316d] transition cursor-pointer"
            to="/explore-mars"
          >
            Explore Mars
          </Link>
          <Link
            className="bg-[#1d3e8a] text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-[#15316d] transition cursor-pointer sm:h-auto flex items-center justify-center"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
