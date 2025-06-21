const axios = require("axios");
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
  const { rover, cameras, sol } = req.query;

  console.log("PARAMS: ", rover, cameras, sol);

  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&cameras=${cameras}&api_key=${apiKey}`;

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
          Sol: sol || "missing",
          Rover: rover || "Rover param is missing and is required",
        },
      });
    }
    return res.json({
      photos: resJson.photos,
      length: resJson.photos.length,
    });
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
    const { max_sol, max_date, landing_date, total_photos, photos, name } =
      photo_manifest;

    res.status(200).json({
      roverDetails: {
        landing_date,
        max_date,
        rover: name,
        max_sol,
        total_photos,
        photos,
      },
    });
  } catch (error) {
    console.error("Error fetching from the NASA API: ", err);
    res.status(500).json({ error: "Failed to fetch rovers manifest", err });
  }
});

app.get("/api/feed", async (req, res) => {
  const { start, end } = req.query;
  const apiKey = process.env.NASA_API_KEY;

  try {
    const response = await axios.get("https://api.nasa.gov/neo/rest/v1/feed", {
      params: { start_date: start, end_date: end, api_key: apiKey },
    });

    const { near_earth_objects } = response.data;

    res.status(200).json({ near_earth_objects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch NEO data" });
  }
});
