import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState("");

  const fetchGeoData = async () => {
    setGeoData(null);
    setError("");

    try {
      const response = await fetch("/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeoData(data);
      } else {
        setError(data.message || "Failed to fetch coordinates");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>City to Geo Converter</h1>
      <input
        type="text"
        placeholder="Enter a city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button onClick={fetchGeoData} style={{ padding: "0.5rem" }}>
        Convert
      </button>
      <div style={{ marginTop: "1rem" }}>
        {geoData && (
          <div>
            <h3>Coordinates:</h3>
            <p>
              Latitude: {geoData.latitude} <br />
              Longitude: {geoData.longitude}
            </p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
