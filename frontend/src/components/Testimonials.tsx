'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

type Testimonial = {
  name: string
  country?: string
  comment: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sophie',
    country: 'France',
    comment:
      "An amazing food experience! I learned to cook couscous and enjoyed a truly memorable meal with a Tunisian family.",
    image: '/images/users/sophie.jpg',
  },
  {
    name: 'Luca',
    country: 'Italy',
    comment:
      "From bustling markets to fragrant spices and friendly faces — a complete Tunisian cultural immersion with TuniSavors.",
    image: '/images/users/luca.jpg',
  },
  {
    name: 'Amina',
    country: 'Canada',
    comment:
      "The homemade brik and mint tea on the terrace were unforgettable. So simple, so authentic, so magical.",
    image: '/images/users/amina.jpg',
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#fff] py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#A12312] mb-12">
          💬Traveler testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-[#fff4f0] p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="absolute top-4 right-4 text-[#D65A31] opacity-20 w-10 h-10" />
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-gray-700 mb-4">“{t.comment}”</p>
              <p className="font-semibold text-[#A12312]">
                {t.name} {t.country && <span className="text-gray-500">— {t.country}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonials
