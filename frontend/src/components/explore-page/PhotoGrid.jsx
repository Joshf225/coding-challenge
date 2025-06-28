import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import AstronautLoader from "../loaders/AstronautLoader";

const PhotoGrid = ({
  isLoading,
  displayPhotos,
  sol,
  rover,
  cameras,
  length,
  earthDate,
}) => {
  const [currIndex, setCurrIndex] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextSlide = () => {
    if (currIndex + 10 > displayPhotos.length) {
      return setCurrIndex(0);
    }
    const newIndex = currIndex + 10;
    setCurrIndex(newIndex);
  };

  const handlePreviousSlide = () => {
    if (currIndex === 0) return;
    const newIndex = currIndex - 10;
    setCurrIndex(newIndex);
  };
  const earthDateMonth = new Date(displayPhotos[0]?.earth_date).getMonth();
  const earthDateDay = new Date(displayPhotos[0]?.earth_date).getUTCDay();
  const earthDateYear = new Date(displayPhotos[0]?.earth_date).getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <section className="px-11 flex flex-col items-center justify-center">
      {!isLoading ? (
        <>
          {displayPhotos.length > 0 ? (
            <section className="px-5">
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                We found {length} photos for the {rover} rover on Sol {sol}!
              </h2>
              <div className="flex items-center gap-3 relative">
                <h2 className="text-xl font-medium text-gray-800 mb-2 flex items-center relative">
                  It is Sol {sol} on Mars{" "}
                  <FaRegQuestionCircle
                    className="ml-3 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                </h2>
                {isHovered && (
                  <span className="absolute w-[200px] flex items-center justify-center bg-white text-black text-wrap p-2 bottom-[35px] left-[220px] border">
                    Sol {sol} is {dayNames[earthDateDay]},{" "}
                    {monthNames[earthDateMonth]} {earthDateYear} here on Earth
                  </span>
                )}
              </div>
              {/* 
               or {dayNames[earthDateDay]} /{" "}
                {monthNames[earthDateMonth]} / {earthDateYear} on Earth
              */}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                {displayPhotos.length > 9
                  ? displayPhotos
                      .slice(currIndex - 10, currIndex)
                      .map((photo, index) => (
                        <a href={photo.img_src} target="_blank" key={index}>
                          <img
                            src={photo.img_src}
                            alt="Mars"
                            className="w-full h-40 object-cover rounded shadow cursor-pointer"
                          />
                        </a>
                      ))
                  : displayPhotos.map((photo, index) => (
                      <a href={photo.img_src} target="_blank" key={index}>
                        <img
                          src={photo.img_src}
                          alt="Mars"
                          className="w-full h-40 object-cover rounded shadow cursor-pointer"
                        />
                      </a>
                    ))}
              </div>
            </section>
          ) : (
            rover && (
              <p className="text-gray-600 sm:w-1/2 sm:px-0 px-5 flex items-center justify-center">
                We found {length} photos for the {rover} rover on Sol {sol}! But
                unfortunetly the photos for this Rover and Sol date have been
                corrupted 😓😓😓. Try changing the sol!
              </p>
            )
          )}
        </>
      ) : (
        <div className="mt-[200px] flex items-center justify-center m-4">
          {/* <h1>
            You may experience a long waiting period when using this app, this
            is because I'm using a free service to host my backend/api. Just
            give it up to 30sec max and then refresh and try again if you get no
            response. Thanks for joining me on this journey to Mars!!
          </h1> */}
          <AstronautLoader />
        </div>
      )}
      {displayPhotos && (
        <div className="flex gap-5 justify-center items-center sm:mb-0 mb-5">
          <button
            className={`bg-black h-6 w-11 ${
              currIndex >= 20 ? "" : "hidden" || length < 10 ? "hidden" : ""
            }`}
            onClick={() => handlePreviousSlide()}
          >
            Back
          </button>
          <button
            className={`bg-black h-6 w-11 ${
              currIndex >= displayPhotos.length - 10 ? "hidden" : ""
            }`}
            onClick={() => handleNextSlide()}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default PhotoGrid;
