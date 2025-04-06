import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-6">💸 AutoRecon.ai</h1>
      <p className="text-xl text-gray-700 mb-8">
        Reconcile your financial data in minutes — not hours. AI-powered automation for small finance teams and bookkeepers.
      </p>
      <Link
        to="/match"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
      >
        Try It Now
      </Link>
    </div>
  );
}
