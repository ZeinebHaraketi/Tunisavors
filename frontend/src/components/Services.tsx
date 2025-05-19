'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Utensils, Map, Heart } from 'lucide-react'

const services = [
  {
    title: 'Cook with Locals',
    description: 'Join home-cooked meals and learn traditional recipes from Tunisian families.',
    icon: <Utensils className="h-10 w-10 text-[#D65A31]" />,
  },
  {
    title: 'Culinary Roadmaps',
    description: 'Discover food tours and local specialties by region with our interactive map.',
    icon: <Map className="h-10 w-10 text-[#D65A31]" />,
  },
  {
    title: 'Authentic Encounters',
    description: 'Meet passionate cooks and explore real Tunisian culture through food.',
    icon: <Heart className="h-10 w-10 text-[#D65A31]" />,
  },
]

const Services = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#fff4f0] to-white text-center px-4" id="services">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#A12312] mb-4">
          What We Offer
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-14">
          Embark on a flavorful journey through Tunisia with unforgettable experiences designed to connect you with the heart of local cuisine.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D65A31]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#A12312] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Services
