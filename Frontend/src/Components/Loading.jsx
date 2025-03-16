import React from "react";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br  text-black">
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-6xl font-bold mb-4"
      >
        FoodSync
      </motion.div>

      {/* Bouncing Dots */}
      <motion.div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{ y: [-10, 0, -10] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-4 text-lg text-gray-300"
      >
        Reducing food waste, one step at a time...
      </motion.p>
    </div>
  );
}
