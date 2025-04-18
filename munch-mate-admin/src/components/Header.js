// import React from "react";

// const Header = ({ toggleSidebar, isAuthenticated, adminName = " ", onLogout }) => {
//   return (
//     <div className="bg-white p-4 shadow-md">
//       <div className="flex justify-between items-center">
//         <button onClick={toggleSidebar} className="text-gray-800">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>-
//         </button>
//         <h3 className="text-lg font-semibold text-gray-800">Welcome, Admin</h3>
//         {isAuthenticated && (
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">{adminName}</span>
//             <button
//               onClick={onLogout}
//               className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//             >
//               Login
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;


// import React, { useState } from "react";
// import { UserCircle, LogOut } from "lucide-react"; // Optional icons for aesthetics

// const Header = ({ toggleSidebar, isAuthenticated, adminName = "Admin", onLogout }) => {
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const handleProfileClick = () => {
//     setShowProfileMenu((prev) => !prev);
//   };

//   return (
//     <div className="bg-white p-4 shadow-md relative">
//       <div className="flex justify-between items-center">
//         <button onClick={toggleSidebar} className="text-gray-800">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//         </button>

//         <h3 className="text-lg font-semibold text-gray-800">Welcome, Admin</h3>

//         {isAuthenticated && (
//           <div className="relative">
//             <button
//               onClick={handleProfileClick}
//               className="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//             >
//               <UserCircle size={20} />
//               <span>{adminName}</span>
//             </button>

//             {showProfileMenu && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
//                 <button
//                   onClick={onLogout}
//                   className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   <LogOut size={16} className="mr-2" />
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


// import React, { useState } from "react";

// const Header = ({ toggleSidebar, isAuthenticated, adminName = "", onLogout }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className="bg-white p-4 shadow-md">
//       <div className="flex justify-between items-center">
//         <button onClick={toggleSidebar} className="text-gray-800">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//         <h3 className="text-lg font-semibold text-gray-800">Welcome, Admin</h3>

//         {isAuthenticated && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="bg-gray-200 px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-300"
//             >
//               {adminName}
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-50">
//                 <button
//                   onClick={onLogout}
//                   className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
//                 >
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



// import React, { useState } from "react";
// import { UserCircle } from "lucide-react"; // Importing Lucide profile icon

// const Header = ({ toggleSidebar, isAuthenticated, adminName = "", onLogout }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className="bg-white p-4 shadow-md">
//       <div className="flex justify-between items-center">
//         {/* Sidebar toggle button */}
//         <button onClick={toggleSidebar} className="text-gray-800">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>

//         {/* Center text */}
//         <h3 className="text-lg font-semibold text-gray-800">Welcome, Admin</h3>

//         {/* Profile and dropdown */}
//         {isAuthenticated && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center bg-gray-200 px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-300 transition"
//             >
//               <UserCircle className="w-5 h-5 mr-2" />
//               {adminName}
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                 <div className="px-4 py-2 border-b text-sm text-gray-700 font-medium">
//                   Profile
//                 </div>
//                 <button
//                   onClick={onLogout}
//                   className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition rounded-b-lg"
//                 >
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




// import React, { useState } from "react";
// import { LogOut, User } from "lucide-react";

// const Header = ({ toggleSidebar, isAuthenticated, adminName = "", onLogout }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

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
//               {/* Avatar circle */}
//               <img
//                 src={`https://ui-avatars.com/api/?name=${adminName}&background=f4a261&color=fff&rounded=true`}
//                 alt="avatar"
//                 className="w-8 h-8 rounded-full border border-white shadow"
//               />
//               <span className="text-gray-700 font-medium">{adminName}</span>
//             </button>

//             {/* Dropdown */}
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
//                 <div className="px-4 py-3 border-b text-sm text-gray-700 font-medium flex items-center gap-2">
//                   <User className="w-4 h-4 text-gray-500" />
//                   Profile
//                 </div>
//                 <button
//                   onClick={onLogout}
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
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      onLogout(); // Updates auth state in parent
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
