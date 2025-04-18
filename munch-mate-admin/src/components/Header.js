
// import React, { useState } from "react";
// import { LogOut, User } from "lucide-react";
// import axios from "axios";

// const Header = ({ toggleSidebar, isAuthenticated, adminName = "", onLogout }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "https://munch-mates.onrender.com/api/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.removeItem("token");
//       onLogout(); // Updates auth state in parent
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <div className="bg-white p-4 shadow-md">
//       <div className="flex justify-between items-center">
//         {/* Sidebar toggle */}
//         <button onClick={toggleSidebar} className="text-gray-800">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>

//         {/* Center title */}
//         <h3 className="text-lg font-semibold text-gray-800">Welcome, Admin</h3>

//         {/* Right-side profile */}
//         {isAuthenticated && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
//             >
//               <img
//                 src={`https://ui-avatars.com/api/?name=${adminName}&background=f4a261&color=fff&rounded=true`}
//                 alt="avatar"
//                 className="w-8 h-8 rounded-full border border-white shadow"
//               />
//               <span className="text-gray-700 font-medium">{adminName}</span>
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
//                 <div className="px-4 py-3 border-b text-sm text-gray-700 font-medium flex items-center gap-2">
//                   <User className="w-4 h-4 text-gray-500" />
//                   Profile
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-3 text-sm text-left flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-b-lg"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { LogOut, User } from "lucide-react";
import axios from "axios";

const Header = ({ toggleSidebar, isAuthenticated, adminName = "", onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    console.log("Logout button clicked");

    try {
      const token = localStorage.getItem("token");
      console.log("Token found:", token);

      await axios.post(
        "https://munch-mates.onrender.com/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Logout success");
      localStorage.removeItem("token");
      setShowDropdown(false); // Close dropdown
      onLogout(); // Call parent handler to update auth state
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Sidebar toggle */}
        <button onClick={toggleSidebar} className="text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Center title */}
        <h3 className="text-lg font-semibold text-gray-800">Welcome, Admin</h3>

        {/* Right-side profile */}
        {isAuthenticated && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${adminName}&background=f4a261&color=fff&rounded=true`}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white shadow"
              />
              <span className="text-gray-700 font-medium">{adminName}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b text-sm text-gray-700 font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Profile
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-sm text-left flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-b-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
