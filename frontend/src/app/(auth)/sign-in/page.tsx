"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { loginUser } from "@/lib/api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email); // ✅ appel à ton backend
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#A12312]">Welcome Back!</h2>
      <p className="text-sm text-gray-600">
        Enter your email to receive your magic link and continue exploring
        Tunisian flavors 🍽️
      </p>

      {submitted ? (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl">
          ✅ A magic link has been sent to <strong>{email}</strong>. <br />
          Please check your inbox!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute top-4 left-4 text-[#D65A31]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#D65A31] text-[#A12312] focus:outline-none focus:ring-2 focus:ring-[#A12312] transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#A12312] hover:bg-[#D65A31] text-white font-semibold rounded-xl transition-colors"
          >
            Send Magic Link
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      )}
    </motion.div>
  );
}
