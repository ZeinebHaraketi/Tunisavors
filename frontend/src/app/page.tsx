'use client'

import CallToAction from '@/components/CallToAction'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import TunisiaMap from '@/components/TunisiaMap'

export default function Home() {
  return (
    <main className="min-h-screen bg-red-100">
      <Navbar />
      <Hero />
      <Services />
      {/* <TunisiaMap /> */}

      <Gallery />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
      <Contact />
      <Footer />
    </main>
  )
}
