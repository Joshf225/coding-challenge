import React, { useState } from "react";

// import { Slider } from "@/components/ui/slider";

const ExplorePage = () => {
  const [earthDate, setEarthDate] = useState("");
  const [rover, setRover] = useState("Curiosity");
  const [camera, setCamera] = useState("NAVCAM");
  const [sol, setSol] = useState(3788);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/mars-photos`);
      // const data = await res.json();
      console.log("DATA FROM BACKEND!! ", res);
      // setPhotos(data.photos || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    console.log("FETCH");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#0c1c3b]">Mission to Mars</h1>
        <nav className="space-x-6 text-lg font-medium">
          <a href="/explore" className="text-[#0c1c3b]">
            Explore Mars
          </a>
          <a href="/trivia" className="text-[#0c1c3b]">
            Trivia
          </a>
        </nav>
      </header>

      {/* Controls */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Earth Date
          </label>
          <input
            type="date"
            value={earthDate}
            onChange={(e) => setEarthDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b]"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Rover</label>
          <select
            value={rover}
            onChange={(e) => setRover(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b]"
          >
            <option>Curiosity</option>
            <option>Opportunity</option>
            <option>Spirit</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Camera</label>
          <select
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c1c3b]"
          >
            <option>NAVCAM</option>
            <option>FHAZ</option>
            <option>RHAZ</option>
            <option>MAST</option>
            <option>CHEMCAM</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchPhotos}
            className="w-full bg-[#1d3e8a] text-white py-2 rounded-md font-semibold hover:bg-[#15316d] transition"
          >
            Fetch Photos
          </button>
        </div>
      </section>

      {/* Photo Grid */}
      <section>
        {photos.length > 0 ? (
          <>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              {rover} | {camera} | Sol {sol}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {photos.slice(0, 10).map((photo, index) => (
                <img
                  key={index}
                  // src={photo.img_src}
                  alt="Mars"
                  className="w-full h-40 object-cover rounded shadow"
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">
            No photos found. Try another date or camera.
          </p>
        )}
      </section>

      {/* Sol Slider */}
      <section className="mt-6">
        <label className="block text-gray-700 font-medium mb-1">Sol</label>
        <input
          type="range"
          min="0"
          max="5000"
          value={sol}
          // onChange={(e) => setSol(e.target.value)}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">Selected Sol: {sol}</p>
        {/* <Slider
          defaultValue={[sol]}
          max={5000}
          step={1}
          value={[sol]}
          onChange={(e) => setSol(e.target.value)}
        /> */}
      </section>
    </div>
  );
};

export default ExplorePage;
