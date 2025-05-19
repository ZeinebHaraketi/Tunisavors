'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Masonry from 'react-masonry-css'


type ImageItem = {
  src: string
  alt: string
  title: string
}

const images: ImageItem[] = [
  {
    src: '/images/couscous-tn.jpg',
    alt: 'Traditional Couscous',
    title: 'A regal couscous dish with fresh seasonal vegetables',
  },
  {
    src: '/images/marche-sfax.jpg',
    alt: 'Local Souk in Sfax',
    title: 'A burst of colors and flavors at the Sfax souk',
  },
  {
    src: '/images/brik-tn.jpg',
    alt: 'Crunchy brik',
    title: '"Golden-crisp egg brik, perfectly fried',
  },
  {
    src: '/images/the-tn.jpg',
    alt: 'Refreshing Tunisian mint tea',
    title: 'A friendly gathering over a cup of mint tea',
  },
  {
    src: '/images/lablabi.jpg',
    alt: 'Lablabi',
    title: 'Steaming Lablabi – a hearty and beloved Tunisian classic',
  },
  {
  src: '/images/bambalouni.jpg',
  alt: 'Bambalouni',
  title: 'Golden Bambalouni, the beloved treat from Sidi Bou Said',
}

]

const Gallery = () => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

    const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  }


    return (
    <section id="galerie" className="py-20 px-4 bg-[#fff4f0]">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#A12312] mb-10">
          Experience the moment through images
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {images.map((img, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="relative cursor-pointer rounded-xl overflow-hidden group shadow-lg"
      onClick={() => {
        setIndex(i)
        setOpen(true)
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-[250px] object-cover transition duration-300 group-hover:brightness-75"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {img.title}
      </div>
    </motion.div>
  ))}
</div>

      </motion.div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({
          src: img.src,
          description: img.title,
        }))}
      />
    </section>
  )
}

export default Gallery
