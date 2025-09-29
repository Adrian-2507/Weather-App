import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from "lucide-react";

const getWeatherIcon = (condition, description) => {
  const lower = condition?.toLowerCase() || "";
  const desc = description?.toLowerCase() || "";
  
  if (lower.includes("clear") || lower.includes("sunny")) return "☀️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("rain") || desc.includes("rain")) return "🌧️";
  if (lower.includes("thunder") || lower.includes("storm")) return "⛈️";
  if (lower.includes("snow")) return "🌨️";
  if (lower.includes("fog") || lower.includes("mist")) return "🌫️";
  if (lower.includes("wind")) return "💨";
  return "🌤️";
};

const StatCard = ({ icon: Icon, label, value, unit, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative overflow-hidden"
  >
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
        <div className="relative flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-20`}>
            <Icon className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-lg font-bold text-gray-800">
              {value}
              {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function WeatherCard({ weatherData }) {
  const weatherIcon = getWeatherIcon(weatherData.condition, weatherData.description);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto"
    >
      {/* Main Weather Card */}
      <Card className="bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 border-0 shadow-2xl mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <CardContent className="relative p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Location and basic info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 opacity-80" />
                <h2 className="text-2xl font-bold">
                  {weatherData.city}
                  {weatherData.country && `, ${weatherData.country}`}
                </h2>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">{weatherIcon}</span>
                <div>
                  <p className="text-5xl font-bold leading-none">
                    {Math.round(weatherData.temperature_celsius)}°
                  </p>
                  <p className="text-lg opacity-90 mt-1">
                    {weatherData.temperature_fahrenheit && 
                      `${Math.round(weatherData.temperature_fahrenheit)}°F`
                    }
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-xl font-semibold capitalize">
                  {weatherData.condition}
                </p>
                <p className="text-lg opacity-80 capitalize">
                  {weatherData.description}
                </p>
                {weatherData.feels_like_celsius && (
                  <p className="text-sm opacity-70 mt-2">
                    Feels like {Math.round(weatherData.feels_like_celsius)}°C
                  </p>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 md:w-64">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm font-medium">Humidity</span>
                </div>
                <p className="text-xl font-bold">{weatherData.humidity}%</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4" />
                  <span className="text-sm font-medium">Wind</span>
                </div>
                <p className="text-xl font-bold">
                  {weatherData.wind_speed_kmh}
                  <span className="text-sm font-normal ml-1">km/h</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Eye}
          label="Visibility"
          value={weatherData.visibility_km || "N/A"}
          unit={weatherData.visibility_km ? "km" : ""}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={Gauge}
          label="Pressure"
          value={weatherData.pressure_hpa || "N/A"}
          unit={weatherData.pressure_hpa ? "hPa" : ""}
          gradient="from-green-500 to-teal-500"
        />
        <StatCard
          icon={Sunrise}
          label="Sunrise"
          value={weatherData.sunrise || "N/A"}
          gradient="from-yellow-500 to-orange-500"
        />
        <StatCard
          icon={Sunset}
          label="Sunset"
          value={weatherData.sunset || "N/A"}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {weatherData.uv_index && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="font-semibold">UV Index</p>
                  <p className="text-sm opacity-90">
                    {weatherData.uv_index < 3 ? "Low" : 
                     weatherData.uv_index < 6 ? "Moderate" :
                     weatherData.uv_index < 8 ? "High" : "Very High"}
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  {weatherData.uv_index}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
