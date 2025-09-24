import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherByCity } from "./utils/api";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const handleSearch = async () => {
    setError(null);
    if (!city) return setError("Please enter a city name");
    if (!API_KEY) return setError("Missing API key — add it to .env.local");

    setLoading(true);
    const res = await fetchWeatherByCity(city, API_KEY);
    setLoading(false);

    if (res.error) {
      setWeather(null);
      setError(res.error);
    } else {
      setWeather(res);
    }
  };

  return (
    <div className="app-root">
      <div className="card">
        <h1 className="title">Weather App</h1>

        <div className="controls">
          <input
            type="text"
            value={city}
            placeholder="Enter city (e.g. London)"
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && weather.main ? (
          <WeatherCard weather={weather} />
        ) : (
          <p className="hint">Type a city and press Enter or click Search.</p>
        )}
      </div>
    </div>
  );
}
