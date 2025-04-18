import React, { useState } from "react";

const ChefManagement = () => {
  const [chefs, setChefs] = useState([
    { id: 1, name: "Chef John", availability: "Available", orders: 5 },
    { id: 2, name: "Chef Maria", availability: "Busy", orders: 3 },
  ]);

  const assignChef = (id) => {
    setChefs(chefs.map((chef) => (chef.id === id ? { ...chef, availability: "Busy" } : chef)));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Chef Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Orders Completed</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr key={chef.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{chef.id}</td>
                <td className="p-2">{chef.name}</td>
                <td className="p-2">{chef.availability}</td>
                <td className="p-2">{chef.orders}</td>
                <td className="p-2">
                  <button
                    onClick={() => assignChef(chef.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    disabled={chef.availability === "Busy"}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefManagement;