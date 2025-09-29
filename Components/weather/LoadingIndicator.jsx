import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Sun, CloudRain } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md mx-auto mb-8"
    >
      <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="relative mb-6">
            {/* Animated weather icons */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 4, ease: "linear", repeat: Infinity },
                scale: { duration: 2, ease: "easeInOut", repeat: Infinity }
              }}
              className="w-16 h-16 mx-auto mb-4 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full opacity-20" />
              <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Floating clouds */}
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
              className="absolute -top-2 -left-4"
            >
              <Cloud className="w-8 h-8 text-blue-300" />
            </motion.div>

            <motion.div
              animate={{ 
                x: [0, -8, 0],
                y: [0, 3, 0]
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
              className="absolute -top-1 -right-6"
            >
              <CloudRain className="w-6 h-6 text-sky-300" />
            </motion.div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Fetching Weather Data
          </h3>
          <p className="text-gray-500 mb-6">
            Getting the latest weather information for your city...
          </p>

          {/* Loading dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
