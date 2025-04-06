import { motion } from "framer-motion";
import { Link } from "react-router-dom";
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
  

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Reconciliation. Reinvented.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            AutoRecon.ai uses AI to match your financial transactions —
            no spreadsheets, no stress.
          </p>
          <Link
            to="/match"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl transition shadow-lg"
          >
            Try AutoRecon Now →
          </Link>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          <FeatureCard
            title="📥 Smart Imports"
            desc="Upload CSVs or exports from your system with zero formatting rules."
          />
          <FeatureCard
            title="🤖 AI-Powered Matching"
            desc="Detects exact, fuzzy, and partial matches automatically."
          />
          <FeatureCard
            title="📤 Export Ready"
            desc="Download clean Excel reports — matched + unmatched in separate sheets."
          />
        </motion.div>

        {/* JOIN WAITLIST */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 p-8 rounded-2xl text-center shadow-xl backdrop-blur"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            🚀 Join the Waitlist
          </h2>
          <p className="text-gray-300 mb-6">
            We’re opening access soon. Be first to get early access.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-xl text-black border w-full sm:w-80"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
            >
              Notify Me
            </button>
          </form>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-8">
        © {new Date().getFullYear()} AutoRecon.ai — Built for finance teams.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur hover:scale-105 transition transform">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}
