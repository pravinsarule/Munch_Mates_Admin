import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
    category: 'veg',
  });
  const [editingMenu, setEditingMenu] = useState(null);

  const BASE_URL = 'https://munch-mates.onrender.com/api/menu';
  const IMAGE_BASE_URL = 'https://munch-mates.onrender.com/uploads/';

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      const reversed = res.data.reverse();
      setMenus(reversed);
      applyFilter(filter, reversed);
    } catch (err) {
      toast.error('Failed to fetch menus');
    }
  };

  const applyFilter = (filterType, menuList = menus) => {
    if (filterType === 'all') {
      setFilteredMenus(menuList);
    } else {
      setFilteredMenus(menuList.filter((menu) => menu.category === filterType));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || (!formData.image && !editingMenu)) {
      toast.error('All fields including image are required for new menu');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingMenu) {
        await axios.put(`${BASE_URL}/update/${editingMenu.id}`, data);
        toast.success('Menu updated');
      } else {
        await axios.post(`${BASE_URL}/add`, data);
        toast.success('Menu created');
      }

      fetchMenus();
      setShowForm(false);
      setEditingMenu(null);
      setFormData({ title: '', description: '', price: '', image: null, category: 'veg' });
    } catch (err) {
      toast.error('Failed to save menu');
    }
  };

  const handleEdit = (menu) => {
    setFormData({
      title: menu.title,
      description: menu.description,
      price: menu.price,
      image: null,
      category: menu.category,
    });
    setEditingMenu(menu);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      toast.success('Menu deleted');
      fetchMenus();
    } catch (err) {
      toast.error('Failed to delete menu');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2a2e3b]">🍽️ Menu Management</h2>
        <div className="flex gap-4 items-center">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              applyFilter(e.target.value);
            }}
            className="border rounded px-3 py-2"
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
          >
            Add New Menu
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingMenu ? 'Update Menu' : 'Create Menu'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
              </select>
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
                  {editingMenu ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMenu(null);
                    setFormData({ title: '', description: '', price: '', image: null, category: 'veg' });
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
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu, index) => (
                <tr key={menu.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">
                    <img
                      src={
                        menu.image
                          ? `${IMAGE_BASE_URL}${menu.image}`
                          : 'https://via.placeholder.com/100'
                      }
                      alt={menu.title}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-3 border">{menu.title}</td>
                  <td className="p-3 border">{menu.description}</td>
                  <td className="p-3 border">₹{menu.price}</td>
                  <td className="p-3 border text-center capitalize">{menu.category}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <FiEdit
                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        size={20}
                        onClick={() => handleEdit(menu)}
                      />
                      <FiTrash2
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        size={20}
                        onClick={() => handleDelete(menu.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No menus found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menus;