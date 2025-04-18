

// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

const LoginForm = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("https://munch-mates.onrender.com/api/admin/auth/login", {
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
