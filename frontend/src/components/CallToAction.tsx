"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mt-10">
      <Image
        src="/images/tun-bg.jpg" // 🖼️ Change par une belle image immersive
        alt="Tunisian Experience"
        fill
        className="object-cover brightness-[0.4]"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <motion.h2
          className="text-3xl md:text-5xl font-bold drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Want to discover Tunisia like a true local?{" "}
        </motion.h2>

        <motion.p
          className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Savor the flavors, embrace the encounters, and take home unforgettable memories.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D65A31] hover:bg-[#A12312] text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition-colors"
            >
              Let the food journey begin!
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
