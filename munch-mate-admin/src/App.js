
// src/App.js
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Menus from "./pages/Menus";
// import Orders from "./pages/Orders";
// import CelebrationCards from "./pages/CelebrationCards";

// import Chefs from "./pages/Chefs";
// import Settings from "./pages/Settings";
// import LandingPage from "./pages/LandingPage";

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [adminEmail, setAdminEmail] = useState("");
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedEmail = localStorage.getItem("adminEmail");
//     const expiryTime = localStorage.getItem("expiry");

//     const isTokenValid = savedToken && expiryTime && new Date().getTime() < Number(expiryTime);

//     if (savedToken && savedEmail && isTokenValid) {
//       setToken(savedToken);
//       setAdminEmail(savedEmail);
//       setIsAuthenticated(true);
//     } else {
//       localStorage.clear();
//     }
//   }, []);

//   const handleLogin = ({ token, email }) => {
//     const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
//     localStorage.setItem("token", token);
//     localStorage.setItem("adminEmail", email);
//     localStorage.setItem("expiry", expiryTime.toString());

//     setToken(token);
//     setAdminEmail(email);
//     setIsAuthenticated(true);

//     // Optional: redirect to dashboard
//     window.location.href = "/dashboard";
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:5000/api/auth/logout", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }

//     localStorage.clear();
//     setIsAuthenticated(false);
//     setAdminEmail("");
//     setToken("");
//   };

//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated) return <Navigate to="/" replace />;
//     return children;
//   };

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100 overflow-hidden">
//         {isAuthenticated ? (
//           <>
//             <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//             <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} overflow-y-auto transition-all duration-300`}>
//               <Header
//                 toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
//                 isAuthenticated={isAuthenticated}
//                 adminName={adminEmail.split("@")[0]}
//                 onLogout={handleLogout}
//               />
//               <div className="p-6">
//                 <Routes>
//                   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                   <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
//                   <Route path="/menus" element={<ProtectedRoute><Menus /></ProtectedRoute>} />
//                   <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
//                   <Route path="/celebration-cards" element={<ProtectedRoute><CelebrationCards /></ProtectedRoute>} />

//                   <Route path="/chefs" element={<ProtectedRoute><Chefs /></ProtectedRoute>} />
//                   <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//                   <Route path="*" element={<Navigate to="/dashboard" replace />} />
//                 </Routes>
//               </div>
//             </div>
//           </>
//         ) : (
//           <Routes>
//             <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Menus from "./pages/Menus";
import Orders from "./pages/Orders";
import CelebrationCards from "./pages/CelebrationCards";
import Chefs from "./pages/Chefs";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("adminEmail");
    const expiryTime = localStorage.getItem("expiry");

    const isTokenValid = savedToken && expiryTime && new Date().getTime() < Number(expiryTime);

    if (savedToken && savedEmail && isTokenValid) {
      setToken(savedToken);
      setAdminEmail(savedEmail);
      setIsAuthenticated(true);
    } else {
      localStorage.clear();
    }
  }, []);

  const handleLogin = ({ token, email }) => {
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem("token", token);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("expiry", expiryTime.toString());

    setToken(token);
    setAdminEmail(email);
    setIsAuthenticated(true);

    window.location.href = "/dashboard";
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.clear();
    setIsAuthenticated(false);
    setAdminEmail("");
    setToken("");
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {isAuthenticated ? (
          <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} overflow-y-auto transition-all duration-300`}>
              <Header
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isAuthenticated={isAuthenticated}
                adminName={adminEmail.split("@")[0]}
                onLogout={handleLogout}
              />
              <div className="p-6">
                <Routes>
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                  <Route path="/menus" element={<ProtectedRoute><Menus /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/celebration-cards" element={<ProtectedRoute><CelebrationCards /></ProtectedRoute>} />
                  <Route path="/chefs" element={<ProtectedRoute><Chefs /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
