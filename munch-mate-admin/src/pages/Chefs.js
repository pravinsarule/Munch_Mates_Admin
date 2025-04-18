

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Chef = () => {
  const [chefs, setChefs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    experience: '',
    image: null,
  });
  const [editingChef, setEditingChef] = useState(null);

  const BASE_URL = 'https://munch-mates.onrender.com/api/chefs';
  const IMAGE_BASE_URL = 'https://munch-mates.onrender.com/uploads/';

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      console.log('Fetched Chefs:', res.data);
      setChefs(res.data.reverse());
    } catch (err) {
      toast.error('Failed to fetch chefs');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.speciality || !formData.experience || (!formData.image && !editingChef)) {
      toast.error('All fields including image are required');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('speciality', formData.speciality);
    data.append('experience', formData.experience);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingChef) {
        await axios.put(`${BASE_URL}/update-chefs/${editingChef.id}`, data);
        toast.success('Chef updated');
      } else {
        await axios.post(`${BASE_URL}/add-chefs`, data);
        toast.success('Chef added');
      }

      fetchChefs();
      setShowForm(false);
      setEditingChef(null);
      setFormData({ name: '', speciality: '', experience: '', image: null });
    } catch (err) {
      toast.error('Failed to save chef');
    }
  };

  const handleEdit = (chef) => {
    setFormData({
      name: chef.name,
      speciality: chef.speciality,
      experience: chef.experience,
      image: null,
    });
    setEditingChef(chef);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-chefs/${id}`);
      toast.success('Chef deleted');
      fetchChefs();
    } catch (err) {
      toast.error('Failed to delete chef');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2a2e3b]">👨‍🍳 Chef Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
        >
          Add New Chef
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingChef ? 'Update Chef' : 'Create Chef'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                placeholder="Speciality"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience (years)"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
                >
                  {editingChef ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingChef(null);
                    setFormData({ name: '', speciality: '', experience: '', image: null });
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">S. No.</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Speciality</th>
              <th className="p-3 border">Experience</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.length > 0 ? (
              chefs.map((chef, index) => (
                <tr key={chef.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">
                    <img
                      src={
                        chef.image
                          ? `${IMAGE_BASE_URL}${chef.image}`
                          : 'https://via.placeholder.com/100'
                      }
                      alt={chef.name}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-3 border">{chef.name}</td>
                  <td className="p-3 border">{chef.speciality}</td>
                  <td className="p-3 border">{chef.experience} yrs</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <FiEdit
                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        size={20}
                        onClick={() => handleEdit(chef)}
                      />
                      <FiTrash2
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(chef.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No chefs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chef;
