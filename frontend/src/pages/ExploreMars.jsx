import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhotoGrid from "../components/explore-page/PhotoGrid";
import SolSlider from "../components/explore-page/SolSlider";
import RoverCameras from "../components/explore-page/RoverCameras";
import Rover from "../components/explore-page/Rover";

const ExplorePage = () => {
  const [rover, setRover] = useState(null);
  const [cameras, setCameras] = useState("navcam");
  const [sol, setSol] = useState(0);
  // const [photos, setPhotos] = useState([]);
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const [photosLength, setPhotosLength] = useState(0);
  // keeping track for whenever we need to check the new photos from localStorage
  const [RoverDetails, setRoverDetails] = useState(null);
  const [roverMaxSol, setRoverMaxSol] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "http://localhost:3000/api";

  const fetchPhotos = async () => {
    if (!rover || !cameras)
      return console.log("missing rover, sol, or cameras");

    const cacheKey = `${rover}_${cameras}_sol${sol}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setDisplayPhotos(JSON.parse(cached));
      setPhotosLength(JSON.parse(cached).length);
      return console.log("PULLED FROM CACHE!!");
    }
    try {
      setIsLoading(true);
      const params = `rover=${rover}&cameras=${cameras}&sol=${sol}`;
      const url = `${baseUrl}/mars-photos?${params}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { photos, length } = await res.json();
      setPhotosLength(length);

      const validPhotos = photos
        ?.filter((photo) => {
          // check the 5+6 characters from the end
          if (
            photo.img_src.slice(
              photo.img_src.length - 6,
              photo.img_src.length - 4
            ) !== "BR"
          ) {
            return photo;
          }
        })
        .map((photo) => {
          let temp = {
            id: photo.id,
            img_src: photo.img_src,
            earth_date: photo.earth_date,
            name: photo.rover.name,
            sol,
          };
          return temp;
        });
      localStorage.setItem(cacheKey, JSON.stringify(validPhotos));

      if (validPhotos.length < 1) {
        setDisplayPhotos([]);
        return console.log("No Valid Photos from these options!");
      }
      //check if photos array is empty

      setDisplayPhotos(validPhotos || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRover = async (cappedRover) => {
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
      setRoverMaxSol(roverDetails.max_sol);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  React.useEffect(() => {
    if (!rover || !RoverDetails)
      return console.log(`Couldnt find rover or roverDetails??`);
    console.log("Rover Details: ", RoverDetails);
    fetchPhotos();
  }, [RoverDetails, rover]);

  React.useEffect(() => {
    if (!rover) return;
    const cappedRover = rover[0].toUpperCase() + rover.slice(1);
    fetchRover(cappedRover);
  }, [rover]);

  return (
    <div className="min-h-screen w-full bg-white border">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 bg-[#0c1c3b] h-[60px] w-full px-11">
        <h1 className="text-3xl font-bold">Mission to Mars</h1>
        <nav className="space-x-6 text-lg font-medium text-white">
          <Link to="/">Home</Link>
          <Link to="/explore-mars">Explore Mars</Link>
          <Link to="/trivia">Trivia</Link>
          <Link to="/feed">Dashboard</Link>
        </nav>
      </header>

      {/* Controls */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white px-11">
        {/* Rover */}
        <Rover setRover={setRover} />

        {/* Cameras */}
        <RoverCameras
          RoverDetails={RoverDetails}
          cameras={cameras}
          setCameras={setCameras}
        />

        <div className={`flex items-end ${RoverDetails ? "block" : "hidden"}`}>
          <button
            onClick={fetchPhotos}
            className="w-full bg-[#1d3e8a] text-white py-2 rounded-md font-semibold hover:bg-[#15316d] transition"
          >
            Fetch Photos
          </button>
        </div>
      </section>

      {/* Sol Slider */}
      <SolSlider roverMaxSol={roverMaxSol} sol={sol} setSol={setSol} />

      {/* Photo Grid */}
      <PhotoGrid
        isLoading={isLoading}
        displayPhotos={displayPhotos}
        sol={sol}
        rover={rover}
        cameras={cameras}
        length={photosLength}
      />
    </div>
  );
};

export default ExplorePage;
