const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const apiKey = process.env.NASA_API_KEY;

//optimise api to grab data from the based on earth_date and store it in localStorage, then if the date is changed we grap photos from localStorage based off the other filters (sol, camers etc..)

app.get("/api/mars-photos", async (req, res) => {
  const { earth_date, rover, cameras, sol } = req.query;

  console.log("PARAMS: ", earth_date, rover, cameras, sol);

  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&sol=${sol}&cameras=${cameras}&api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = await response.json();
    if (!resJson.photos) {
      res.status(500).json({
        error: "Params is empty",
        data: {
          Camera: cameras || "missing",
          Earth_Date: earth_date || "missing",
          Sol: sol || "missing",
          Rover: rover || "Rover param is missing and is required",
        },
      });
    }
    return res.json({ photos: resJson.photos, length: resJson.photos.length });
  } catch (err) {
    console.error("Error fetching from the NASA API: ", err);
    res.status(500).json({ error: "Failed to fetch photos", err });
  }
});

app.get("/api/manifests", async (req, res) => {
  const { rover } = req.query;
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { photo_manifest } = await response.json();
    const { max_sol, max_date, landing_date, total_photos } = photo_manifest;
    res.status(200).json({
      roverDetails: {
        landing_date,
        max_date,
        max_sol,
        total_photos,
      },
    });
  } catch (error) {
    console.error("Error fetching from the NASA API: ", err);
    res.status(500).json({ error: "Failed to fetch rovers manifest", err });
  }
});
