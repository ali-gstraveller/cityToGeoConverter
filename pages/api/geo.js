// pages/api/geo.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    const apiKey = process.env.GEOCODING_API_KEY; // Store this in .env.local
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      city
    )}&key=${apiKey}`;

    const { data } = await axios.get(apiUrl);

    if (data.results.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    const { lat, lng } = data.results[0].geometry;
    return res.status(200).json({ city, latitude: lat, longitude: lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
