import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CelebrationCards = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });
  const [editingCard, setEditingCard] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const BASE_URL = 'http://localhost:5000/api/occasion-cards';
  const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getAll`);
      const sorted = res.data.slice().reverse();
      setCards(sorted);
    } catch (err) {
      toast.error('Failed to fetch cards');
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

    // Only validate required fields during ADD
    if (!editingCard) {
      if (!formData.title.trim()) return toast.error('Title is required');
      if (!formData.description.trim()) return toast.error('Description is required');
      if (!formData.category.trim()) return toast.error('Category is required');
      if (!formData.image) return toast.error('Image is required');
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingCard) {
        await axios.put(`${BASE_URL}/update/${editingCard.id}`, data);
        toast.success('Card updated');
      } else {
        await axios.post(`${BASE_URL}/create`, data);
        toast.success('Card created');
      }

      fetchCards();
      setShowForm(false);
      setEditingCard(null);
      setFormData({ title: '', description: '', category: '', image: null });
    } catch (err) {
      console.error(err);
      toast.error('Failed to save card');
    }
  };

  const handleEdit = (card) => {
    setFormData({
      title: card.title,
      description: card.description,
      category: card.category,
      image: null,
    });
    setEditingCard(card);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      if (response.status === 200) {
        toast.success('Card deleted');
        fetchCards();
      } else {
        toast.error('Failed to delete card');
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || 'Failed to delete card');
    }
  };

  const handleCategoryFilter = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getByCategory/${categoryFilter}`);
      setCards(res.data);
    } catch (err) {
      toast.error('Failed to filter cards');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2a2e3b]">🎊 Celebration Cards Management</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleCategoryFilter}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Filter
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingCard(null);
              setFormData({ title: '', description: '', category: '', image: null });
            }}
            className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
          >
            Add New Card
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingCard ? 'Update Card' : 'Create Card'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
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
                  {editingCard ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCard(null);
                    setFormData({ title: '', description: '', category: '', image: null });
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
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <tr key={card.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">
                    <img
                      src={
                        card.image_url
                          ? `${IMAGE_BASE_URL}${card.image_url}`
                          : 'https://via.placeholder.com/100'
                      }
                      alt={card.title}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-3 border">{card.title}</td>
                  <td className="p-3 border">{card.description}</td>
                  <td className="p-3 border">{card.category}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <FiEdit
                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        size={20}
                        onClick={() => handleEdit(card)}
                      />
                      <FiTrash2
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(card.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No cards found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CelebrationCards;
