import { useEffect, useState } from "react";
import Loader from "../Loader";

const PhotoGrid = ({
  isLoading,
  displayPhotos,
  sol,
  rover,
  cameras,
  length,
}) => {
  const [currIndex, setCurrIndex] = useState(10);

  useEffect(() => {
    console.log("Display Photos: ", displayPhotos);
  }, [displayPhotos]);

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

  return (
    <section className="px-11 flex flex-col items-center justify-center">
      {!isLoading ? (
        <>
          {displayPhotos.length > 0 ? (
            <>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                We found {length} photos for the {rover} rover on Sol {sol}!
              </h2>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                {rover} | {cameras} | Sol {sol}
              </h2>

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
            </>
          ) : (
            <p className="text-gray-600 w-1/2 flex items-center justify-center">
              We found {length} photos for the {rover} rover on Sol {sol}! But
              unfortunetly the photos for this Rover and Sol date have been
              corrupted 😓😓😓. Try changing the sol!
            </p>
          )}
        </>
      ) : (
        <div className="mt-[200px] flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="flex gap-5 ">
        <button
          className={`bg-black h-6 w-11 ${
            currIndex >= 20 ? "" : "hidden" || length < 10 ? "hidden" : ""
          }`}
          onClick={() => handlePreviousSlide()}
        >
          Prev
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
    </section>
  );
};

export default PhotoGrid;
