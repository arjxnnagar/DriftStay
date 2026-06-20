import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function HostDashboard() {

  const navigate = useNavigate();
  const { user, token ,isLoading } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const func = async () =>{

      if(isLoading) return;
      if (!token) {
        toast.error("Not authorized");
        navigate("/auth");
        return;
      }

      if (!user) {
        return;
      }

      if (user.role !== "HOST") {
        toast.error("You are not a host");
        navigate("/dashboard");
      }
    }
    const fetchProp = async () => {
      if (!user) return;
      const res = await api.get(`/property/myprop/${user.id}`);
      setProperties(res.data.prop);
    };
    fetchProp();
    func();
}, [user,token]);



  const recentBookings = [
    {
      guest: "Rahul Sharma",
      property: "Luxury Apartment",
      date: "16 Jun 2026",
      amount: "₹4,500",
    },
    {
      guest: "Anjali Singh",
      property: "Mountain Villa",
      date: "15 Jun 2026",
      amount: "₹6,500",
    },
    {
      guest: "Aman Gupta",
      property: "Beach House",
      date: "14 Jun 2026",
      amount: "₹8,000",
    },
  ];

  const addNew = () => {
    navigate("/host/addproperty");
  }


  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Host Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your properties and bookings.
            </p>
          </div>

          <button
            className="mt-4 md:mt-0 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 cursor-pointer"
            onClick={() => addNew()}
          >
            + Add Property
          </button>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Properties</p>
            <h2 className="text-3xl font-bold mt-2">12</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Bookings</p>
            <h2 className="text-3xl font-bold mt-2">84</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-3xl font-bold mt-2">₹1,24,000</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Rating</p>
            <h2 className="text-3xl font-bold mt-2">⭐ 4.8</h2>
          </div>
        </section>

        {/* Recent Bookings */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Recent Bookings</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Guest</th>
                  <th className="text-left py-3">Property</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Amount</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">{booking.guest}</td>
                    <td>{booking.property}</td>
                    <td>{booking.date}</td>
                    <td className="font-medium">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Properties */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Properties</h2>

            <button className="text-black font-medium">View All</button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={property.photos?.[0]}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{property.title}</h3>

                  <p className="text-gray-500 mt-1">📍 {property.location}</p>

                  <p className="mt-3 font-medium">
                    ₹{property.pricePerNight}/night
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {property.bookings} bookings this month
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button className="flex-1 bg-black text-white py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="flex-1 border py-2 rounded-lg">
                      Analytics
                    </button>
                  </div>
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
