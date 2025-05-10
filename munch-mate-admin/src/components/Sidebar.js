
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white text-[#2a2e3b] p-4 transition-transform duration-300 z-50 shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#2a2e3b]">MunchMates Admin</h3>
        <button onClick={toggleSidebar} className="text-[#2a2e3b] focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-2">
        {[
          { to: "/dashboard", label: "Dashboard", icon: "🏠" },
          { to: "/users", label: "Users", icon: "👤" },
          { to: "/menus", label: "Menus", icon: "🍽️" },
          { to: "/celebration-cards", label: "Celebration Cards", icon: "🎊" },
          { to: "/slider", label: "Slider", icon: "🎊" },
          { to: "/service-card", label: "Service Card", icon: "🛎️" },
          { to: "/orders", label: "Orders", icon: "📦" },
          { to: "/chefs", label: "Chefs", icon: "👨‍🍳" },
          { to: "/settings", label: "Settings", icon: "⚙️" },
        ].map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-[#e76f51] transition-colors ${
                  isActive ? "bg-[#e76f51] text-[#f5c8a0] font-semibold" : "text-[#2a2e3b]"
                }`
              }
            >
              <span className="mr-2">{icon}</span>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
