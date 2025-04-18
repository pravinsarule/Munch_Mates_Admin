
import React, { useState } from "react";

const MenuManagement = ({ occasions, updateOccasion, removeOccasion }) => {
  const [newOccasion, setNewOccasion] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddOccasion = () => {
    if (newOccasion.trim()) {
      updateOccasion(occasions.length, newOccasion);
      setNewOccasion("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(occasions[index]);
  };

  const handleSave = (index) => {
    if (editValue.trim()) {
      updateOccasion(index, editValue);
      setEditIndex(null);
      setEditValue("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Menu Management</h3>
      <div className="mb-4">
        <input
          type="text"
          value={newOccasion}
          onChange={(e) => setNewOccasion(e.target.value)}
          placeholder="Add new occasion"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddOccasion}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Add Occasion
        </button>
      </div>
      <div className="space-y-2">
        {occasions.map((occasion, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-3/4 p-1 border rounded"
              />
            ) : (
              <h4 className="text-gray-700">{occasion}</h4>
            )}
            <div className="space-x-2">
              {editIndex === index ? (
                <button
                  onClick={() => handleSave(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => removeOccasion(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;