"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#fff4f0] text-[#A12312] py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[#A12312]">
          📞 Contact Us
        </h2>
        <p className="text-xl text-[#A12312] mb-10">
          Have a question or want to learn more about our culinary adventures? Reach out to us! We're here to help you on your journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Section */}
          <div className="bg-[#fff4f0] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-12 h-12 text-[#A12312] hover:text-[#D65A31]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#A12312] mb-4">
              Email Us
            </h3>
            <p className="text-md text-gray-700 mb-4">
              For any inquiries or assistance, feel free to reach out to us via email. We're always ready to help you!
            </p>
            <a
              href="mailto:info@tunisavors.com"
              className="text-[#D65A31] hover:text-[#A12312] transition-colors text-lg"
            >
              info@tunisavors.com
            </a>
          </div>

          {/* Phone Section */}
          <div className="bg-[#fff4f0] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <Phone className="w-12 h-12 text-[#A12312] hover:text-[#D65A31]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#A12312] mb-4">
              Call Us
            </h3>
            <p className="text-md text-gray-700 mb-4">
              Prefer to speak with us directly? Give us a call, and we'll be happy to assist you with all your questions.
            </p>
            <a
              href="tel:+123456789"
              className="text-[#D65A31] hover:text-[#A12312] transition-colors text-lg"
            >
              +123 456 789
            </a>
          </div>

          {/* Location Section */}
          <div className="bg-[#fff4f0] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-12 h-12 text-[#A12312] hover:text-[#D65A31]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#A12312] mb-4">
              Visit Us
            </h3>
            <p className="text-md text-gray-700 mb-4">
              If you're in Tunisia, feel free to visit us and explore the local culinary scene. We’d love to meet you in person!
            </p>
            <p className="text-[#D65A31] text-lg">123 Culinary Street, Tunis</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-[#A12312] mb-8">
            Send Us a Message
          </h3>
          <form action="#" method="POST" className="space-y-6 bg-white p-10 rounded-xl shadow-lg">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border-2 border-[#D65A31] focus:border-[#A12312] text-[#D65A31] focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border-2 border-[#D65A31] focus:border-[#A12312] text-[#D65A31] focus:outline-none"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 rounded-xl border-2 border-[#D65A31] focus:border-[#A12312] text-[#D65A31] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-10 py-4 bg-[#A12312] text-white rounded-xl hover:bg-[#D65A31] transition-colors text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
