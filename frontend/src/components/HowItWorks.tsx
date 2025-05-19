'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPinned, CalendarCheck, Smile, ArrowRight, ArrowDown } from 'lucide-react'

const steps = [
  {
    icon: <MapPinned className="w-10 h-10 text-[#D65A31]" />,
    title: 'Pick a region',
    description: 'Discover Tunisia\'s culinary regions and their distinctive specialties.',
  },
  {
    icon: <CalendarCheck className="w-10 h-10 text-[#D65A31]" />,
    title: 'Sign up for a workshop',
    description: 'Cooking classes, shared meals, market visits… book everything with just a few clicks.',
  },
  {
    icon: <Smile className="w-10 h-10 text-[#D65A31]" />,
    title: 'Embark on a local adventure',
    description: 'Immerse yourself in Tunisian culture, share, cook, taste, and live the experience.',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#A12312] mb-12">
          🧭 How it Works ?
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="bg-[#fff4f0] p-4 rounded-xl shadow-md w-full md:w-72 min-h-[250px] hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-[#A12312] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>

              {/* Show arrow unless it's the last step */}
              {index < steps.length - 1 && (
                <div className="text-[#D65A31]">
                  {/* Mobile: vertical arrow | Desktop: horizontal arrow */}
                  <div className="block md:hidden">
                    <ArrowDown className="w-6 h-6" />
                  </div>
                  <div className="hidden md:block">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default HowItWorks
