

// import React, { useEffect, useState } from "react";
// import { Pencil, Trash2, Save, Plus } from "lucide-react";

// const Menus = () => {
//   const [menuCards, setMenuCards] = useState([]);
//   const [form, setForm] = useState({ title: "", description: "", price: "", image: null });
//   const [editForm, setEditForm] = useState({ title: "", description: "", price: "", image: null });
//   const [editId, setEditId] = useState(null);

//   const fetchMenuCards = async () => {
//     const res = await fetch("http://localhost:5000/api/menu");
//     const data = await res.json();
//     setMenuCards(Array.isArray(data) ? data : []);
//   };

//   useEffect(() => {
//     fetchMenuCards();
//   }, []);

//   const handleAddCard = async () => {
//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     if (form.image) formData.append("image", form.image);

//     const res = await fetch("http://localhost:5000/api/menu/add", {
//       method: "POST",
//       body: formData,
//     });

//     const newCard = await res.json();
//     setMenuCards([newCard, ...menuCards]);
//     setForm({ title: "", description: "", price: "", image: null });
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/api/menu/delete/${id}`, { method: "DELETE" });
//     setMenuCards(menuCards.filter((card) => card.id !== id));
//   };

//   const handleEdit = (card) => {
//     setEditId(card.id);
//     setEditForm({
//       title: card.title,
//       description: card.description,
//       price: card.price,
//       image: null,
//     });
//   };

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     formData.append("title", editForm.title);
//     formData.append("description", editForm.description);
//     formData.append("price", editForm.price);
//     if (editForm.image instanceof File) {
//       formData.append("image", editForm.image);
//     }

//     const res = await fetch(`http://localhost:5000/api/menu/update/${editId}`, {
//       method: "PUT",
//       body: formData,
//     });

//     const updated = await res.json();
//     setMenuCards(menuCards.map((card) => (card.id === updated.id ? updated : card)));
//     setEditId(null);
//     setEditForm({ title: "", description: "", price: "", image: null });
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     const res = await fetch(`http://localhost:5000/api/menu/update/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ isActive: !currentStatus }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const updated = await res.json();
//     setMenuCards(menuCards.map((card) => (card.id === updated.id ? updated : card)));
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Menus</h2>

//       {/* Form */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <input
//           type="file"
//           onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//           className="p-2 border rounded"
//         />
//         <button
//           onClick={handleAddCard}
//           className="col-span-1 md:col-span-4 bg-amber-500 text-white p-2 rounded hover:bg-amber-600 flex items-center justify-center"
//         >
//           <Plus className="mr-2" size={18} /> Add Menu
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border rounded shadow">
//           <thead>
//             <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">Description</th>
//               <th className="p-3 border">Price</th>
//               <th className="p-3 border">Status</th>
//               <th className="p-3 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {menuCards.map((card) => (
//               <tr key={card.id} className="border-b text-sm">
//                 <td className="p-2">
//                   {card.image && (
//                     <img
//                       src={`http://localhost:5000/uploads/${card.image}`}
//                       alt={card.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   )}
//                 </td>
//                 {editId === card.id ? (
//                   <>
//                     <td className="p-2">
//                       <input
//                         value={editForm.title}
//                         onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//                         className="border rounded p-1 w-full"
//                       />
//                     </td>
//                     <td className="p-2">
//                       <input
//                         value={editForm.description}
//                         onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                         className="border rounded p-1 w-full"
//                       />
//                     </td>
//                     <td className="p-2">
//                       <input
//                         type="number"
//                         value={editForm.price}
//                         onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
//                         className="border rounded p-1 w-full"
//                       />
//                     </td>
//                     <td className="p-2 text-green-600 font-medium">Active</td>
//                     <td className="p-2 text-center space-x-2">
//                       <button
//                         onClick={handleUpdate}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       >
//                         <Save size={14} />
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="p-2">{card.title}</td>
//                     <td className="p-2">{card.description}</td>
//                     <td className="p-2">₹{card.price}</td>
//                     <td className="p-2">
//                       <button
//                         onClick={() => toggleStatus(card.id, card.isActive)}
//                         className={`px-2 py-1 rounded text-xs font-medium ${
//                           card.isActive ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
//                         }`}
//                       >
//                         {card.isActive ? "Active" : "Inactive"}
//                       </button>
//                     </td>
//                     <td className="p-2 text-center space-x-2">
//                       <button
//                         onClick={() => handleEdit(card)}
//                         className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
//                       >
//                         <Pencil size={14} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(card.id)}
//                         className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Menus;



// import React, { useEffect, useState } from "react";
// import { Pencil, Trash2, Save, Plus } from "lucide-react";

// const Menus = () => {
//   const [menuCards, setMenuCards] = useState([]);
//   const [form, setForm] = useState({ title: "", description: "", price: "", image: null });
//   const [editForm, setEditForm] = useState({ title: "", description: "", price: "", image: null });
//   const [editId, setEditId] = useState(null);

//   const fetchMenuCards = async () => {
//     const res = await fetch("http://localhost:5000/api/menu");
//     const data = await res.json();
//     setMenuCards(Array.isArray(data) ? data : []);
//   };

//   useEffect(() => {
//     fetchMenuCards();
//   }, []);

//   const handleAddCard = async () => {
//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     if (form.image) formData.append("image", form.image);

//     const res = await fetch("http://localhost:5000/api/menu/add", {
//       method: "POST",
//       body: formData,
//     });

//     const newCard = await res.json();
//     setMenuCards([newCard, ...menuCards]);
//     setForm({ title: "", description: "", price: "", image: null });
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/api/menu/delete/${id}`, { method: "DELETE" });
//     setMenuCards(menuCards.filter((card) => card.id !== id));
//   };

//   const handleEdit = (card) => {
//     setEditId(card.id);
//     setEditForm({
//       title: card.title,
//       description: card.description,
//       price: card.price,
//       image: null,
//     });
//   };

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     formData.append("title", editForm.title);
//     formData.append("description", editForm.description);
//     formData.append("price", editForm.price);
//     if (editForm.image instanceof File) {
//       formData.append("image", editForm.image);
//     }

//     const res = await fetch(`http://localhost:5000/api/menu/update/${editId}`, {
//       method: "PUT",
//       body: formData,
//     });

//     const updated = await res.json();
//     setMenuCards(menuCards.map((card) => (card.id === updated.id ? updated : card)));
//     setEditId(null);
//     setEditForm({ title: "", description: "", price: "", image: null });
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Menus</h2>

//       {/* Form */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <input
//           type="file"
//           onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//           className="p-2 border rounded"
//         />
//         <button
//           onClick={handleAddCard}
//           className="col-span-1 md:col-span-4 bg-amber-500 text-white p-2 rounded hover:bg-amber-600 flex items-center justify-center"
//         >
//           <Plus className="mr-2" size={18} /> Add Menu
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//               <th className="p-3 border border-gray-300">Image</th>
//               <th className="p-3 border border-gray-300">Title</th>
//               <th className="p-3 border border-gray-300">Description</th>
//               <th className="p-3 border border-gray-300">Price</th>
//               <th className="p-3 border border-gray-300 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {menuCards.map((card) => (
//               <tr
//                 key={card.id}
//                 className="border border-gray-300 text-sm hover:bg-gray-50 transition-all duration-200"
//               >
//                 <td className="p-2 border border-gray-300">
//                   {card.image && (
//                     <img
//                       src={`http://localhost:5000/uploads/${card.image}`}
//                       alt={card.title}
//                       className="w-16 h-16 object-cover rounded mx-auto"
//                     />
//                   )}
//                 </td>
//                 {editId === card.id ? (
//                   <>
//                     <td className="p-2 border border-gray-300">
//                       <input
//                         value={editForm.title}
//                         onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//                         className="border rounded p-1 w-full"
//                       />
//                     </td>
//                     <td className="p-2 border border-gray-300">
//                       <input
//                         value={editForm.description}
//                         onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                         className="border rounded p-1 w-full"
//                       />
//                     </td>
//                     <td className="p-2 border border-gray-300">
//                       <input
//                         type="number"
//                         value={editForm.price}
//                         onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
//                         className="border rounded p-1 w-full"
//                       />
//                     </td>
//                     <td className="p-2 border border-gray-300 text-center space-x-2">
//                       <button
//                         onClick={handleUpdate}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       >
//                         <Save size={14} />
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="p-2 border border-gray-300">{card.title}</td>
//                     <td className="p-2 border border-gray-300">{card.description}</td>
//                     <td className="p-2 border border-gray-300">₹{card.price}</td>
//                     <td className="p-2 border border-gray-300 text-center space-x-2">
//                       <button
//                         onClick={() => handleEdit(card)}
//                         className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
//                       >
//                         <Pencil size={14} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(card.id)}
//                         className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Menus;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const [editingMenu, setEditingMenu] = useState(null);

  const BASE_URL = 'http://localhost:5000/api/menu';
  const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      setMenus(res.data.reverse());
    } catch (err) {
      toast.error('Failed to fetch menus');
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
    if (!formData.title || !formData.description || !formData.price || (!formData.image && !editingMenu)) {
      toast.error('All fields including image are required for new menu');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
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
      setFormData({ title: '', description: '', price: '', image: null });
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
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
        >
          Add New Menu
        </button>
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
                    setFormData({ title: '', description: '', price: '', image: null });
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
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.length > 0 ? (
              menus.map((menu, index) => (
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
                <td colSpan="6" className="text-center p-4 text-gray-500">
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
