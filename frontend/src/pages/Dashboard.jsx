import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user,setUser,setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);


  const logout = async () =>{
    setUser("");
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }


  const [search, setSearch] = useState("");

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

  const filteredProperties = allProperties.filter((property) =>
    property.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* HERO SECTION */}
        <section className="bg-linear-to-r from-black via-gray-900 to-black text-white rounded-3xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-gray-300 mb-2">Welcome back 👋</p>

              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {user?.name || "Traveler"}
              </h1>

              <p className="text-gray-300 max-w-xl">
                Discover beautiful stays, plan your next adventure, and manage
                all your bookings in one place.
              </p>
            </div>

            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${
                  user?.name || "User"
                }&background=random`
              }
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Bookings</p>
            <h3 className="text-3xl font-bold mt-2">12</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Favorites</p>
            <h3 className="text-3xl font-bold mt-2">5</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Reviews</p>
            <h3 className="text-3xl font-bold mt-2">8</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Trips</p>
            <h3 className="text-3xl font-bold mt-2">18</h3>
          </div>
        </section>

        {/* SEARCH */}
        <section className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Destinations</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
              Search
            </button>
          </div>
        </section>

        {/* RECENT BOOKINGS */}
        <section className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>

            <button className="text-sm font-medium text-black">View All</button>
          </div>

          <div className="border border-dashed rounded-xl p-8 text-center">
            <p className="text-gray-500">You haven't made any bookings yet.</p>
          </div>
        </section>

        {/* PROPERTIES */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended Properties</h2>

            <button className="text-black font-medium">Explore More →</button>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <p className="text-gray-500">No properties found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-56 object-cover"
                    />

                    <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ {property.rating}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{property.title}</h3>

                    <p className="text-gray-500 mb-4">📍 {property.location}</p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-xl">
                          ₹{property.price}
                        </span>
                        <span className="text-gray-500 text-sm"> / night</span>
                      </div>

                      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-linear-to-r from-black via-gray-900 to-black text-white rounded-3xl p-8 md:p-12 mb-8 mt-8 cursor-pointer"
        onClick={logout}>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-6xl">
            Logout
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
