import React from "react";

export default function WeatherCard({ weather }) {
  const icon = weather.weather?.[0]?.icon;
  const description = weather.weather?.[0]?.description;
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;

  return (
    <div className="weather-card">
      <div className="top">
        <h2>
          {weather.name}, {weather.sys?.country}
        </h2>
        {iconUrl && <img src={iconUrl} alt={description} />}
      </div>

      <p className="desc">{description}</p>

      <div className="metrics">
        <div className="metric">
          <div className="value">{Math.round(weather.main.temp)}°C</div>
          <div className="label">Temperature</div>
        </div>
        <div className="metric">
          <div className="value">{weather.main.humidity}%</div>
          <div className="label">Humidity</div>
        </div>
        <div className="metric">
          <div className="value">{weather.wind.speed} m/s</div>
          <div className="label">Wind</div>
        </div>
      </div>
    </div>
  );
}
