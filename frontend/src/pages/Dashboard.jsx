import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const allProperties = [
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Delhi",
      price: 4500,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
    {
      id: 2,
      title: "Mountain Villa",
      location: "Manali",
      price: 6500,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    {
      id: 3,
      title: "Beach House",
      location: "Goa",
      price: 8000,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
    {
      id: 4,
      title: "Royal Palace Stay",
      location: "Jaipur",
      price: 5500,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredProperties = allProperties.filter((property) =>
    property.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Find Your Perfect Stay</h1>

          <p className="text-gray-600">
            Search from thousands of properties across India.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by city (Delhi, Goa, Manali...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Properties</p>
            <h3 className="text-3xl font-bold">{allProperties.length}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Cities</p>
            <h3 className="text-3xl font-bold">4</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Average Rating</p>
            <h3 className="text-3xl font-bold">4.8</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Happy Guests</p>
            <h3 className="text-3xl font-bold">10K+</h3>
          </div>
        </div>

        {/* Property Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Available Properties</h2>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">No properties found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">
                        {property.title}
                      </h3>

                      <span className="font-medium">⭐ {property.rating}</span>
                    </div>

                    <p className="text-gray-500 mt-2">📍 {property.location}</p>

                    <p className="text-xl font-bold mt-4">
                      ₹{property.price}
                      <span className="text-sm text-gray-500 font-normal">
                        {" "}
                        / night
                      </span>
                    </p>

                    <button className="w-full mt-5 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
