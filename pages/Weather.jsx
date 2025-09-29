import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sunrise } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherCard from "../components/weather/WeatherCard";
import SearchBar from "../components/weather/SearchBar";
import LoadingIndicator from "../components/weather/LoadingIndicator";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchWeatherData = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await InvokeLLM({
        prompt: `Get current weather data for ${cityName}. Provide accurate, real-time weather information including temperature in both Celsius and Fahrenheit, weather conditions, humidity, wind speed, visibility, atmospheric pressure, and sunrise/sunset times. Format as structured data.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            city: { type: "string" },
            country: { type: "string" },
            temperature_celsius: { type: "number" },
            temperature_fahrenheit: { type: "number" },
            condition: { type: "string" },
            description: { type: "string" },
            humidity: { type: "number" },
            wind_speed_kmh: { type: "number" },
            wind_speed_mph: { type: "number" },
            visibility_km: { type: "number" },
            pressure_hpa: { type: "number" },
            feels_like_celsius: { type: "number" },
            uv_index: { type: "number" },
            sunrise: { type: "string" },
            sunset: { type: "string" },
            icon_description: { type: "string" }
          }
        }
      });

      if (result && result.city) {
        setWeatherData(result);
        setSearchHistory(prev => {
          const newHistory = [cityName, ...prev.filter(city => city !== cityName)].slice(0, 5);
          return newHistory;
        });
      } else {
        setError("City not found. Please check the spelling and try again.");
      }
    } catch (err) {
      setError("Unable to fetch weather data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              Weather App
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover current weather conditions for any city around the world with real-time data and beautiful visualizations.
            </p>
          </motion.div>

          {/* Search Section */}
          <SearchBar 
            onSearch={fetchWeatherData}
            searchHistory={searchHistory}
            isLoading={isLoading}
          />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto mb-8"
              >
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <p className="font-medium">{error}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Indicator */}
          <AnimatePresence>
            {isLoading && <LoadingIndicator />}
          </AnimatePresence>

          {/* Weather Card */}
          <AnimatePresence mode="wait">
            {weatherData && !isLoading && (
              <WeatherCard weatherData={weatherData} />
            )}
          </AnimatePresence>

          {/* Quick Search Suggestions */}
          {!weatherData && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto mt-16"
            >
              <h3 className="text-center text-gray-500 font-medium mb-6">Popular Cities</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["London", "New York", "Tokyo", "Paris", "Sydney", "Dubai"].map((city) => (
                  <button
                    key={city}
                    onClick={() => fetchWeatherData(city)}
                    className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 hover:bg-white hover:scale-105 transition-all duration-200 font-medium shadow-sm"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
