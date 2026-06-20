import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {FileImage,XIcon} from "lucide-react"
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProperty() {

  const navigate = useNavigate();

  const {user} = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
    bedrooms: "",
    guests:"",
    photos:[]
  });
  const [addingP,setAddingP]=useState(false);

  const [selectedFiles,setSelectedFiles] = useState([]);

  const handleFileSelection = (e) =>{
    const files = Array.from(e.target.files);

    setSelectedFiles((prev) => [...prev, ...files]);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setAddingP(true);
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("pricePerNight", formData.pricePerNight);
      data.append("bedrooms", formData.bedrooms);
      data.append("guests", formData.guests);

      selectedFiles.forEach((file) => {
        data.append("photos", file);
      });

      const response = await api.post(`/property/${user.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      navigate("/host");
    } catch (err) {
      toast.error("cannot Add property")
    }finally{
      setAddingP(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="pricePerNight"
              placeholder="Price Per Night"
              value={formData.pricePerNight}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="guests"
                placeholder="Max Guests"
                value={formData.guests}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>

            <div>
              {selectedFiles.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index}>
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(file)}
                          controls
                          className="w-full h-40 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <label className="border p-3 rounded-lg flex items-center justify-between">
                  <p> Add Images</p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => handleFileSelection(e)}
                    className="hidden"
                  />
                  <FileImage />
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={setAddingP}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Create Property
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
