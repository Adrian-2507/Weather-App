import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Clock } from "lucide-react";

export default function SearchBar({ onSearch, searchHistory, isLoading }) {
  const [city, setCity] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (historyCity) => {
    setCity(historyCity);
    onSearch(historyCity);
    setShowHistory(false);
  };

  return (
    <div className="max-w-xl mx-auto mb-12 relative">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="pl-4">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Enter city name (e.g., London, New York, Tokyo)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => setShowHistory(searchHistory.length > 0)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                className="flex-1 border-0 text-lg placeholder:text-gray-400 bg-transparent focus:ring-0 focus:outline-none"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !city.trim()}
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 border-0 shadow-lg px-6 py-2 text-white font-medium transition-all duration-200"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.form>

      {/* Search History */}
      {showHistory && searchHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 right-0 mt-2 z-10"
        >
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Recent Searches</span>
              </div>
              <div className="space-y-1">
                {searchHistory.map((historyCity, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(historyCity)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-150 group"
                  >
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">
                      {historyCity}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
