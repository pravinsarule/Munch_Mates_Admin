// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';

// const CelebrationCards = () => {
//   const [cards, setCards] = useState([]);
//   const [allCards, setAllCards] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     categories: [],
//     image: null,
//   });
//   const [editingCard, setEditingCard] = useState(null);
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const BASE_URL = 'https://munch-mates.onrender.com/api/occasion-cards';
//   const IMAGE_BASE_URL = 'https://munch-mates.onrender.com/uploads/';

//   const availableCategories = [
//     'Corporate Events',
//     'Weddings & Engagements',
//     'Birthday Celebrations',
//     'Festivals',
//     'Housewarming Parties',
//     'Baby Showers',
//     'Weekend & Private Parties',
//   ];

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const fetchCards = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/getAll`);
//       const sorted = res.data.slice().reverse(); // No need to process categories
//       setCards(sorted);
//       setAllCards(sorted);
//     } catch (err) {
//       console.error('Fetch cards error:', err);
//       toast.error(err.response?.data?.error || 'Failed to fetch cards.');
//     }
//   };
  

//   const handleChange = (e) => {
//     const { name, value, checked, files } = e.target;

//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else if (name === 'categories') {
//       const updated = checked
//         ? [...formData.categories, value]
//         : formData.categories.filter(c => c !== value);
//       setFormData({ ...formData, categories: updated });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.description || formData.categories.length === 0) {
//       return toast.error('All fields except image (in update) are required.');
//     }

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('categories', formData.categories.join(','));
//     if (formData.image) data.append('image', formData.image);

//     try {
//       if (editingCard) {
//         await axios.put(`${BASE_URL}/update/${editingCard.id}`, data);
//         toast.success('Card updated!');
//       } else {
//         if (!formData.image) return toast.error('Image is required');
//         await axios.post(`${BASE_URL}/create`, data);
//         toast.success('Card created!');
//       }

//       fetchCards();
//       resetForm();
//     } catch (err) {
//       console.error('Submit error:', err);
//       toast.error(err.response?.data?.error || 'Failed to save card.');
//     }
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingCard(null);
//     setFormData({ title: '', description: '', categories: [], image: null });
//   };

//   const handleEdit = (card) => {
//     setFormData({
//       title: card.title,
//       description: card.description,
//       categories: card.categories,
//       image: null,
//     });
//     setEditingCard(card);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete/${id}`);
//       toast.success('Card deleted!');
//       fetchCards();
//     } catch (err) {
//       console.error('Delete error:', err);
//       toast.error(err.response?.data?.error || 'Failed to delete card.');
//     }
//   };

//   const handleCategoryFilter = () => {
//     if (!categoryFilter) {
//       setCards(allCards);
//       return;
//     }

//     const filtered = allCards.filter(card =>
//       card.categories.includes(categoryFilter)
//     );
//     setCards(filtered);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#2a2e3b]">🎊 Celebration Cards Management</h2>
//         <div className="flex space-x-4">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="">All Categories</option>
//             {availableCategories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <button
//             onClick={handleCategoryFilter}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//           >
//             Filter
//           </button>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowForm(true);
//             }}
//             className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
//           >
//             Add New Card
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
//             <h3 className="text-lg font-bold text-center">{editingCard ? 'Update Card' : 'Create Card'}</h3>
//             <form onSubmit={handleSubmit} className="space-y-3 mt-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full p-2 border rounded"
//               />
//               <div>
//                 <h4 className="font-medium mb-1">Categories</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {availableCategories.map((cat, i) => (
//                     <label key={i} className="flex items-center space-x-1">
//                       <input
//                         type="checkbox"
//                         name="categories"
//                         value={cat}
//                         checked={formData.categories.includes(cat)}
//                         onChange={handleChange}
//                       />
//                       <span>{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {editingCard?.image_url && (
//                 <div>
//                   <p className="text-sm text-gray-600">Current Image:</p>
//                   <img
//                     src={`${IMAGE_BASE_URL}${editingCard.image_url}`}
//                     alt="Card"
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                 </div>
//               )}

//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <div className="flex justify-between mt-4">
//                 <button type="submit" className="bg-[#e76f51] text-white px-4 py-2 rounded">
//                   {editingCard ? 'Update' : 'Create'}
//                 </button>
//                 <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto mt-6">
//         <table className="min-w-full bg-white shadow rounded border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">Sr No</th>
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">Description</th>
//               <th className="p-3 border">Categories</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cards.length > 0 ? (
//               cards.map((card, index) => (
//                 <tr key={card.id} className="border-t">
//                   <td className="p-3 text-center">{index + 1}</td>
//                   <td className="p-3 text-center">
//                     <img
//                       src={card.image_url ? `${IMAGE_BASE_URL}${card.image_url}` : 'https://via.placeholder.com/100'}
//                       alt={card.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-3">{card.title}</td>
//                   <td className="p-3">{card.description}</td>
//                   <td className="p-3">
//                     <ul className="list-disc ml-4 text-sm text-gray-700">
//                       {card.categories.map((cat, idx) => (
//                         <li key={idx}>{cat}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="p-3 text-center space-x-2">
//                     <button onClick={() => handleEdit(card)} className="text-blue-600 hover:text-blue-800">
//                       <FiEdit />
//                     </button>
//                     <button onClick={() => handleDelete(card.id)} className="text-red-600 hover:text-red-800">
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">
//                   No cards found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CelebrationCards;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CelebrationCards = () => {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    image: null,
  });
  const [editingCard, setEditingCard] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const BASE_URL = 'https://munch-mates.onrender.com/api/occasion-cards';
  const IMAGE_BASE_URL = 'https://munch-mates.onrender.com/uploads/';

  const availableCategories = [
    'Corporate Events',
    'Weddings & Engagements',
    'Birthday Celebrations',
    'Festivals',
    'Housewarming Parties',
    'Baby Showers',
    'Weekend & Private Parties',
  ];

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getAll`);
      const sorted = res.data.slice().reverse(); // No need to process categories
      setCards(sorted);
      setAllCards(sorted);
    } catch (err) {
      console.error('Fetch cards error:', err);
      toast.error(err.response?.data?.error || 'Failed to fetch cards.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'categories') {
      const updated = checked
        ? [...formData.categories, value]
        : formData.categories.filter(c => c !== value);
      setFormData({ ...formData, categories: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || formData.categories.length === 0) {
      return toast.error('All fields except image (in update) are required.');
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('categories', formData.categories.join(','));
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingCard) {
        await axios.put(`${BASE_URL}/update/${editingCard.id}`, data);
        toast.success('Card updated!');
      } else {
        if (!formData.image) return toast.error('Image is required');
        await axios.post(`${BASE_URL}/create`, data);
        toast.success('Card created!');
      }

      fetchCards();
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.response?.data?.error || 'Failed to save card.');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCard(null);
    setFormData({ title: '', description: '', categories: [], image: null });
  };

  const handleEdit = (card) => {
    setFormData({
      title: card.title,
      description: card.description,
      categories: card.categories,
      image: null,
    });
    setEditingCard(card);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      toast.success('Card deleted!');
      fetchCards();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.error || 'Failed to delete card.');
    }
  };

  const handleCategoryFilter = () => {
    if (!categoryFilter) {
      setCards(allCards);
      return;
    }

    const filtered = allCards.filter(card =>
      card.categories.includes(categoryFilter)
    );
    setCards(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2a2e3b]">🎊 Celebration Cards Management</h2>
        <div className="flex space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {availableCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleCategoryFilter}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Filter
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-[#e76f51] hover:bg-[#d45f3f] text-white px-4 py-2 rounded"
          >
            Add New Card
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold text-center">{editingCard ? 'Update Card' : 'Create Card'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded"
              />
              <div>
                <h4 className="font-medium mb-1">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((cat, i) => (
                    <label key={i} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        name="categories"
                        value={cat}
                        checked={formData.categories.includes(cat)}
                        onChange={handleChange}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {editingCard?.image_url && (
                <div>
                  <p className="text-sm text-gray-600">Current Image:</p>
                  <img
                    src={`${IMAGE_BASE_URL}${editingCard.image_url}`}
                    alt="Card"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-[#e76f51] text-white px-4 py-2 rounded">
                  {editingCard ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white shadow rounded border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Sr No</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Categories</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <tr key={card.id} className="border-t">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">
                    <img
                      src={card.image_url ? `${IMAGE_BASE_URL}${card.image_url}` : 'https://via.placeholder.com/100'}
                      alt={card.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{card.title}</td>
                  <td className="p-3">{card.description}</td>
                  <td className="p-3">
                    <ul className="list-disc ml-4 text-sm text-gray-700">
                      {card.categories.map((cat, idx) => (
                        <li key={idx}>{cat}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button onClick={() => handleEdit(card)} className="text-blue-600 hover:text-blue-800">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(card.id)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No cards found.
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
