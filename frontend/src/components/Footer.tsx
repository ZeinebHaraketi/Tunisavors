'use client'

import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-[#D65A31] text-[#A12312] py-10 mt-16">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">About</h3>
            <p className="text-sm text-white">
              TuniSavors is your gateway to a unique culinary experience in Tunisia. Explore authentic flavors and connect with locals through cooking workshops and gastronomic discoveries.
            </p>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Useful Links</h3>
            <ul className="text-sm text-white space-y-2">
              <li>
                <a href="#about" className="hover:text-orange-200 transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-200 transition-colors">Contact</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-orange-200 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-200 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-6">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-orange-200  transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-white pt-6 text-center text-sm">
          <p className="text-white">&copy; {new Date().getFullYear()} TuniSavors. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
