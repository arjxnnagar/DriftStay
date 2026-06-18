import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Find your perfect stay anywhere
        </h2>
        <p className="text-gray-600 mb-8">
          Discover unique homes, apartments, and villas around the world.
        </p>

        {/* Search Bar */}
        <div className="bg-white shadow-md rounded-full flex items-center p-2 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Search
          </button>
        </div>
      </main>

      {/* Listings Preview */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-xl font-semibold mb-6">Popular stays</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200" />
              <div className="p-4">
                <h4 className="font-semibold">Cozy Apartment</h4>
                <p className="text-sm text-gray-500">Delhi, India</p>
                <p className="mt-2 font-medium">$120 / night</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
