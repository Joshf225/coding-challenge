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

app.get("/api/mars-photos", async (req, res) => {
  const { earth_date, rover, cameras, sol } = req.query;

  // console.log("PARAMS: ", earth_date, rover, cameras, sol);

  if (!earth_date || !rover || !cameras || !sol) {
    return res.status(500).json({ error: "Params is empty" });
  }

  const apiKey = process.env.NASA_API_KEY;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&earth_date=${earth_date}&sol=${sol}&cameras=${cameras}&api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = await response.json();
    return res.json({ photos: resJson.photos });
  } catch (err) {
    console.error("Error getching from the NASA API: ", err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});
