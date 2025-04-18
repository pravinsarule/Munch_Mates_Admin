import React from "react";

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Business Details</h3>
        <input type="text" placeholder="Company Name" className="w-full p-2 border rounded mb-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
      </div>
    </div>
  );
};

export default Settings;