import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const ExplorePage = () => {
  const [earthDate, setEarthDate] = useState("");
  const [rover, setRover] = useState(null);
  const [cameras, setCameras] = useState("navcam");
  const [sol, setSol] = useState(1000);
  const [photos, setPhotos] = useState([]);
  const [roverDetails, setRoverDetails] = useState(null);
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const [roverMinDate, setRoverMinDate] = useState("");
  const [roverMaxDate, setRoverMaxDate] = useState("");
  const [roverMaxSol, setRoverMaxSol] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = "http://localhost:3000/api";

  const params = `earth_date=${earthDate}&rover=${rover}&cameras=${cameras}&sol=${sol}`;
  const url = `${baseUrl}/mars-photos?${params}`;

  const fetchPhotos = async () => {
    // console.log("PARAMS: ", params);
    // console.log("FULL URL: ", url);
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { photos } = await res.json();
      const workingPhotos = photos?.filter((photo) => {
        // check the 5+6 characters from the end
        if (
          photo.img_src.slice(
            photo.img_src.length - 6,
            photo.img_src.length - 4
          ) !== "BR"
        ) {
          return photo;
        }
      });

      console.log("DATA FROM BACKEND!! ", photos);
      setPhotos(workingPhotos || []);
      setIsLoading(false);
      // add to photos localStorage
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const fetchRover = async (cappedRover) => {
    // const roverCap = rover[0].toUpperCase() + rover.substring(1);
    // console.log("CAPITILISED ROVER: ", roverCap);
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/manifests?rover=${cappedRover}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { roverDetails } = await res.json();
      setRoverDetails(roverDetails);
      setRoverMaxDate(roverDetails.max_date);
      setRoverMinDate(roverDetails.landing_date);
      setRoverMaxSol(roverDetails.max_sol);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  React.useEffect(() => {
    setDisplayPhotos(photos);
    console.log("PHOTOS: ", photos);
  }, [photos]);

  React.useEffect(() => {
    console.log("Rover Details: ", roverDetails);
    console.log("Rover Max Date: ", roverMaxDate);
    console.log("Rover Max Sol: ", roverMaxSol);
    setSol(0);
  }, [roverDetails]);

  React.useEffect(() => {
    // filter displayPhotos based on changed earth date
    let filteredPhotos = displayPhotos.filter((photos) => {
      return earthDate === photos.earth_date;
    });
    setDisplayPhotos(filteredPhotos);
  }, [earthDate]);

  React.useEffect(() => {
    console.log("Display Photos: ", displayPhotos);
  }, [displayPhotos]);

  return (
    <div className="min-h-screen w-full bg-white border">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 bg-[#0c1c3b] h-[60px] w-full px-11">
        <h1 className="text-3xl font-bold">Mission to Mars</h1>
        <nav className="space-x-6 text-lg font-medium text-white">
          <Link to="/">Home</Link>
          <Link to="/explore-mars">Explore Mars</Link>
          <Link to="/trivia">Trivia</Link>
        </nav>
      </header>

      {/* Controls */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white px-11">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Rover</label>
          <select
            onChange={(e) => setRover(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-transparent text-black border-gray-400"
          >
            <option value="">--Please choose a Rover--</option>
            <option value="curiosity" onClick={() => fetchRover("Curiosity")}>
              Curiosity
            </option>
            <option
              value="opportunity"
              onClick={() => fetchRover("Opportunity")}
            >
              Opportunity
            </option>
            <option value="spirit" onClick={() => fetchRover("Spirit")}>
              Spirit
            </option>
          </select>
        </div>

        <div className={roverDetails ? "block" : "hidden"}>
          <label className="block text-gray-700 font-medium mb-1">
            Earth Date
          </label>
          <input
            type="date"
            defaultValue={earthDate}
            min={roverMinDate}
            max={roverMaxDate}
            onChange={(e) => setEarthDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-transparent text-black border-gray-400"
          />
        </div>

        <div className={roverDetails ? "block" : "hidden"}>
          <label className="block text-gray-700 font-medium mb-1">Camera</label>
          <select
            defaultValue={cameras}
            onChange={(e) => setCameras(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b] bg-transparent text-black border-gray-400"
          >
            <option value="navcam">NAVCAM</option>
            <option value="fhaz">FHAZ</option>
            <option value="rhaz">RHAZ</option>
            <option value="mast">MAST</option>
            <option value="chemcam">CHEMCAM</option>
          </select>
        </div>

        <div className={`flex items-end ${roverDetails ? "block" : "hidden"}`}>
          <button
            onClick={fetchPhotos}
            className="w-full bg-[#1d3e8a] text-white py-2 rounded-md font-semibold hover:bg-[#15316d] transition"
          >
            Fetch Photos
          </button>
        </div>
      </section>

      {/* Sol Slider */}
      <section className="mt-6">
        <div className="w-full flex items-center justify-center gap-5">
          <label className="block text-gray-700 font-medium mb-1">Sol</label>
          <input
            type="range"
            min="0"
            max={roverMaxSol || 1000}
            defaultValue={sol}
            onChange={(e) => setSol(e.target.value)}
            className="w-1/2 text-bl"
          />
          <p className="text-sm text-gray-600">
            Selected Sol: {sol}/{roverMaxSol || 1000}
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-11">
        {!isLoading ? (
          <>
            {photos.length > 0 ? (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-2">
                  {rover} | {cameras} | Sol {sol}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                  {displayPhotos.length > 9
                    ? displayPhotos.slice(0, 10).map((photo, index) => (
                        <a href={photo.img_src} target="_blank">
                          <img
                            key={index}
                            src={photo.img_src}
                            alt="Mars"
                            className="w-full h-40 object-cover rounded shadow cursor-pointer"
                          />
                        </a>
                      ))
                    : displayPhotos.map((photo, index) => (
                        <a href={photo.img_src} target="_blank">
                          <img
                            key={index}
                            src={photo.img_src}
                            alt="Mars"
                            className="w-full h-40 object-cover rounded shadow cursor-pointer"
                          />
                        </a>
                      ))}
                </div>
              </>
            ) : (
              <p className="text-gray-600">
                No photos found on this Sol date. Try another date or camera.
              </p>
            )}
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            <Loader />
          </div>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;
