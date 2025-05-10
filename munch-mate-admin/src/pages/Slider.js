import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Sliders = () => {
  const [sliders, setSliders] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = "https://munch-mates.onrender.com/api/sliders";
  const BASE_UPLOADS = "https://munch-mates.onrender.com/uploads/";

  const fetchSliders = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const updated = response.data.map((slider) => ({
        ...slider,
        imageUrl: BASE_UPLOADS + slider.image,
      }));
      setSliders(updated);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch sliders");
    }
  };

  const handleAddSlider = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      await axios.post(BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Slider added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setIsModalOpen(false);
      fetchSliders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add slider");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        await axios.delete(`${BASE_URL}/${id}`);
        toast.success("Slider deleted successfully!");
        fetchSliders();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete slider");
      }
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🖼️ Slider Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e76f51] text-white py-2 px-6 rounded hover:bg-[#d35d3a]"
        >
          + Add New Slider
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-6">Add New Slider</h2>
            <form onSubmit={handleAddSlider} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  className="w-full border rounded p-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  className="w-full"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#e76f51] text-white py-2 px-4 rounded hover:bg-[#d35d3a] w-full"
              >
                Add Slider
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-left">S. No.</th>
              <th className="py-3 px-4 border border-gray-300 text-left">Image</th>
              <th className="py-3 px-4 border border-gray-300 text-left">Title</th>
              <th className="py-3 px-4 border border-gray-300 text-left">Description</th>
              <th className="py-3 px-4 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.length > 0 ? (
              sliders.map((slider, index) => (
                <tr key={slider.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border border-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 border border-gray-300">
                    <img
                      src={slider.imageUrl}
                      alt={slider.title}
                      className="h-20 w-32 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 border border-gray-300">{slider.title}</td>
                  <td className="py-3 px-4 border border-gray-300">{slider.description}</td>
                  {/* <td className="py-3 px-4 border border-gray-300 flex gap-3">
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(slider.id)}
                    >
                      <FaTrash />
                    </button>
                  </td> */}
                   <td className="p-3 border text-center">
                                      <div className="flex justify-center gap-2">
                                        <FiEdit
                                          className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                                          size={20}
                                         
                                        />
                                        <FiTrash2
                                          className="text-red-500 hover:text-red-600 cursor-pointer"
                                          size={20}
                                          onClick={() => handleDelete(slider.id)}
                                        />
                                      </div>
                                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4" colSpan="5">
                  No sliders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sliders;