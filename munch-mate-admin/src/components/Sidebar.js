
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed w-64 h-full bg-white text-[#2a2e3b] p-4 transition-all duration-300 z-50 shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#2a2e3b]">MunchMates Admin</h3>
        <button onClick={toggleSidebar} className="text-[#2a2e3b]">
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
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      <ul className="space-y-2">
        {[
          { to: "/dashboard", label: "Dashboard", icon: "🏠" },
          { to: "/users", label: "Users", icon: "👤" },
          { to: "/menus", label: "Menus", icon: "🍽️" },
          { to: "/celebration-cards", label: "Celebration Cards", icon: "🎊" },
          { to: "/orders", label: "Orders", icon: "📦" },
          { to: "/chefs", label: "Chefs", icon: "👨‍🍳" },
          { to: "/settings", label: "Settings", icon: "⚙️" },
        ].map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `p-2 rounded block hover:bg-[#e76f51] transition ${
                  isActive ? "bg-[#e76f51] text-[#f5c8a0] font-semibold" : ""
                }`
              }
            >
              <span className="mr-2">{icon}</span> {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
