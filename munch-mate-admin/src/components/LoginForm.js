



// import React, { useState } from "react";

// const LoginForm = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Hardcoded credentials for demo (replace with API call in production)
//     if (email === "admin@munchmates.com" && password === "password123") {
//       onLogin(true);
//       onClose(); // Ensure the form closes
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300 hover:shadow-3xl">
//         <h2 className="text-3xl font-bold mb-6 text-[#2a2e3b] text-center">Admin Login</h2>
//         {error && <p className="text-red-500 text-center mb-6">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a261] transition"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a261] transition"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#f4a261] text-[#2a2e3b] py-3 rounded-lg font-semibold hover:bg-[#e76f51] transition duration-300 transform hover:scale-105"
//           >
//             Login
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-full mt-2 text-gray-600 hover:text-gray-800 transition"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




// import React, { useState } from "react";
// import { Mail, Lock } from "lucide-react"; // optional icons (install lucide-react if not)

// const LoginForm = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email === "admin@munchmates.com" && password === "password123") {
//       onLogin(true);
//       onClose();
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
//         <h2 className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-md">
//           Admin Login
//         </h2>
//         {error && <p className="text-red-400 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Field */}
//           <div>
//             <label className="block text-white font-medium mb-1">Email</label>
//             <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#f4a261] transition">
//               <Mail className="text-white mr-2" size={18} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full bg-transparent outline-none text-white placeholder-white/70"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-white font-medium mb-1">Password</label>
//             <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#f4a261] transition">
//               <Lock className="text-white mr-2" size={18} />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full bg-transparent outline-none text-white placeholder-white/70"
//                 required
//               />
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
//           >
//             Login
//           </button>

//           {/* Cancel Button */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-full mt-2 text-white/80 hover:text-white text-sm transition underline"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




// import React, { useState } from "react";
// import { Mail, Lock } from "lucide-react";

// const LoginForm = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token in localStorage (or cookie if needed)
//         localStorage.setItem("token", data.token);
//         onLogin(true); // login success callback
//         onClose(); // close modal
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
//         <h2 className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-md">
//           Admin Login
//         </h2>
//         {error && <p className="text-red-400 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email */}
//           <div>
//             <label className="block text-white font-medium mb-1">Email</label>
//             <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#f4a261] transition">
//               <Mail className="text-white mr-2" size={18} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full bg-transparent outline-none text-white placeholder-white/70"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-white font-medium mb-1">Password</label>
//             <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#f4a261] transition">
//               <Lock className="text-white mr-2" size={18} />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full bg-transparent outline-none text-white placeholder-white/70"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
//           >
//             Login
//           </button>

//           {/* Cancel */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-full mt-2 text-white/80 hover:text-white text-sm transition underline"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



// import React, { useState } from "react";
// import axios from "axios";

// const LoginForm = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token } = response.data;

//       if (token) {
//         onLogin({ token, email }); // Send to App.js
//         onClose(); // Close the modal
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               autoFocus
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#d99152] text-white py-2 rounded-md font-semibold hover:bg-[#e67642] transition duration-200"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <button
//           onClick={onClose}
//           className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 text-center"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



// import React, { useState } from "react";
// import axios from "axios";
// import { Mail, Lock } from "lucide-react";

// const LoginForm = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token } = response.data;

//       if (token) {
//         onLogin({ token, email }); // Send to App.js
//         onClose(); // Close the modal
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//       <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
//         <h2 className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-md">
//           Admin Login
//         </h2>

//         {error && <p className="text-red-400 text-center mb-4">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-6">
//           {/* Email */}
//           <div>
//             <label className="block text-white font-medium mb-1">Email</label>
//             <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#f4a261] transition">
//               <Mail className="text-white mr-2" size={18} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full bg-transparent outline-none text-white placeholder-white/70"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-white font-medium mb-1">Password</label>
//             <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#f4a261] transition">
//               <Lock className="text-white mr-2" size={18} />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full bg-transparent outline-none text-white placeholder-white/70"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* Cancel */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-full mt-2 text-white/80 hover:text-white text-sm transition underline"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

const LoginForm = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/login", {
  //       email,
  //       password,
  //     });

  //     const { token } = response.data;

  //     if (token) {
  //       console.log("Login successful. Token:", token); // Debug log
  //       onLogin({ token, email });
  //       onClose();
  //     } else {
  //       setError("Invalid credentials. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     setError(err.response?.data?.message || "Login failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/admin/auth/login", {
        email,
        password,
      });
  
      const { token } = response.data;
  
      if (token) {
        console.log("Login successful. Token:", token); // Debug log
        onLogin({ token, email });
        onClose();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Updated error handling
      const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-md">
          Admin Login
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3">
              <Mail className="text-white mr-2" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder-white/70"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-1">Password</label>
            <div className="flex items-center bg-white/10 border border-white/30 rounded-lg p-3">
              <Lock className="text-white mr-2" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-white placeholder-white/70"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 text-white/80 hover:text-white text-sm transition underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
