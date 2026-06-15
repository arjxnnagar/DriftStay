import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your properties and bookings.
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Properties" value="12" />
          <StatCard title="Bookings" value="84" />
          <StatCard title="Revenue" value="₹1,24,000" />
          <StatCard title="Reviews" value="4.8 ★" />
        </section>

        {/* Recent Bookings */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>

          <div className="space-y-4">
            {[
              {
                guest: "Rahul Sharma",
                property: "Luxury Apartment",
                date: "15 Jun 2026",
              },
              {
                guest: "Anjali Singh",
                property: "Mountain Villa",
                date: "14 Jun 2026",
              },
              {
                guest: "Aman Gupta",
                property: "Beach House",
                date: "13 Jun 2026",
              },
            ].map((booking, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{booking.guest}</h3>
                  <p className="text-sm text-gray-500">{booking.property}</p>
                </div>

                <span className="text-sm text-gray-500">{booking.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Properties */}
        <section>
          <h2 className="text-xl font-semibold mb-6">My Properties</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((property) => (
              <div
                key={property}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="h-48 bg-gray-300"></div>

                <div className="p-4">
                  <h3 className="font-semibold">Luxury Apartment</h3>

                  <p className="text-sm text-gray-500">Delhi, India</p>

                  <p className="mt-2 font-medium">₹4,500 / night</p>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
                    Manage Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-gray-500 text-sm">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
