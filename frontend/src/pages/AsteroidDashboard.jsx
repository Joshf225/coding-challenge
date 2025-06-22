import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import DatePicker from "../components/dashboard/DatePicker";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const getDayDifference = (fromDateStr, toDateStr) => {
  const from = new Date(fromDateStr);
  const to = new Date(toDateStr);

  // Time difference in milliseconds
  const diffMs = to.getTime() - from.getTime();

  // Convert ms to full days
  return diffMs / (1000 * 60 * 60 * 24);
};

const AsteroidDashboard = () => {
  const start = new Date().toISOString().split("T")[0];
  const end = new Date(Date.now() + 6 * 86400000).toISOString().split("T")[0]; // +6 days
  const [neoData, setNeoData] = useState({});
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState(start);
  const [toDate, setToDate] = useState(end);
  const [checkDate, setCheckDate] = useState(false);

  useEffect(() => {
    // check if user chose dates one week apart
    const days = getDayDifference(fromDate, toDate) + 1;

    console.log("Days: ", days);

    if (days !== 7) {
      return alert("You must pick dates that are a week apart!");
    }

    const fetchNEO = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:3000/api/feed?start=${fromDate}&end=${toDate}`
        );
        const data = await res.json();
        setNeoData(data.near_earth_objects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNEO();
  }, [checkDate]);

  const days = Object.keys(neoData);
  const neosPerDay = days.map((day) => neoData[day].length);

  const avgVelocityData = days.map((day) => {
    const dayData = neoData[day];
    const avg =
      dayData.reduce(
        (sum, neo) =>
          sum +
          parseFloat(
            neo.close_approach_data[0].relative_velocity.kilometers_per_hour
          ),
        0
      ) / dayData.length;
    return parseFloat(avg.toFixed(2));
  });

  const avgDiameterData = days.map((day) => {
    const dayData = neoData[day];
    const avg =
      dayData.reduce((sum, neo) => {
        const min = neo.estimated_diameter.meters.estimated_diameter_min;
        const max = neo.estimated_diameter.meters.estimated_diameter_max;
        return sum + (min + max) / 2;
      }, 0) / dayData.length;
    return parseFloat(avg.toFixed(2));
  });

  return (
    <div className="h-screen w-full bg-white relative">
      <Navbar />

      <h1 className="text-3xl font-bold text-[#0c1c3b] mt-20">
        Asteroid Threat Visualizer
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) : (
        <>
          {/* Chart 1: NEOs per day */}
          <div className="flex items-center justify-center gap-11">
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Total Near-Earth Objects Per Day
              </h2>
              <div className="h-[300px] bg-gray-100 rounded-lg p-4 shadow">
                <Line
                  data={{
                    labels: days,
                    datasets: [
                      {
                        label: "# of Asteroids",
                        data: neosPerDay,
                        borderColor: "#1d3e8a",
                        backgroundColor: "#1d3e8a",
                        fill: false,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Chart 2: Avg Velocity and Diameter */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Average Velocity & Diameter
              </h2>
              <div className="h-[300px] bg-gray-100 rounded-lg p-4 shadow">
                <Bar
                  data={{
                    labels: days,
                    datasets: [
                      {
                        label: "Avg Velocity (km/h)",
                        data: avgVelocityData,
                        backgroundColor: "#1d3e8a",
                      },
                      {
                        label: "Avg Diameter (m)",
                        data: avgDiameterData,
                        backgroundColor: "#e33e3e",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        <h2>Check for the Asteroid Threats on other dates</h2>
        <DatePicker
          setToDate={setToDate}
          setFromDate={setFromDate}
          setCheckDate={setCheckDate}
          checkDate={checkDate}
        />
      </div>
    </div>
  );
};

export default AsteroidDashboard;
