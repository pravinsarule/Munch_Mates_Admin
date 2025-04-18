import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-2xl mb-2 text-amber-500">{icon}</div>
      <h4 className="text-sm text-gray-600">{title}</h4>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatsCard;