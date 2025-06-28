import { VscDebugRerun } from "react-icons/vsc";
import { RiCloseCircleLine } from "react-icons/ri";
import CircleLoader from "../../components/loaders/CircleLoader";
import ImageLoader from "../loaders/ImageLoader";

const Hint = ({
  showHint,
  handleExitHint,
  loadingHint,
  hint,
  isHovered,
  setIsHovered,
  handleNewHint,
}) => {
  return (
    <div
      className={`${
        showHint ? "" : "hidden "
      } bg-white rounded-xl overflow-hidden w-1/2 sm:w-[300px] sm:max-h-full sm:mt-0 mt-5 shadow-lg relative p-5`}
    >
      {loadingHint ? (
        <div className="flex items-center justify-center">
          <CircleLoader />
        </div>
      ) : (
        <div>
          <span
            className="absolute top-4 right-4 cursor-pointer flex items-center justify-center"
            onClick={handleExitHint}
          >
            <RiCloseCircleLine style={{ scale: "1.2" }} />
          </span>
          <h1 className="font-bold text-xl mb-5">Hint:</h1>
          <div className="flex items-center justify-center">
            {loadingHint ? (
              <CircleLoader style={{ scale: "0.5" }} />
            ) : (
              <p>{hint}</p>
            )}
          </div>
          <div className="flex gap-2 items-center mt-5 relative">
            <span
              onClick={handleNewHint}
              className={`ml-5 mb-2${isHovered ? "" : " hidden"}`}
            >
              New Hint
            </span>
            <VscDebugRerun
              className="cursor-pointer absolute"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNewHint}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hint;
