const express = require("express");

const dotenv = require("dotenv");
const axios = require("axios");

const app = express();
const port = 3000;

dotenv.config();

app.get("/mars-photos", async (req, res) => {
  const { earth_date, rover, camera } = req.query;

  const apiKey = process.env.NASA_API_KEY;

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
      {
        params: {
          earth_date,
          camera,
          api_key: apiKey,
        },
      }
    );

    res.json({ photos: response.data.photos });
  } catch (err) {
    console.error("Error getching from the NASA API: ", err);
    res.status(500).json({ error: "Failed to fetch ph" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
