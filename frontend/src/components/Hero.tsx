"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <Image
        src="/hero2.jpg"
        alt="TuniSavors Hero"
        fill
        className="object-cover"
        quality={100}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <motion.div
          className="text-center text-white px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Explore Tunisia, One Flavor at a Time
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Dive into authentic recipes, local secrets, and unforgettable
            culinary experiences with TuniSavors.
          </p>
          <p className="mt-8 text-md md:text-lg italic font-semibold text-orange-200">
            “Taste the soul of Tunisia in every dish.”
          </p>

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
              href="/discover"
              className="inline-block px-6 py-3 rounded-2xl bg-[#D65A31] text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-[#b44b28] shadow-lg"
            >
              Discover Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
