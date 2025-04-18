



import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";

const LandingPage = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const content = document.querySelector(".landing-content");
    content.classList.add("opacity-0");
    setTimeout(() => content.classList.remove("opacity-0"), 100);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582920980795-2f97b0834c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8cmVzdGF1cmFudHN8fDB8fHx8MTYxOTMxMDYxNA&ixlib=rb-1.2.1&q=80&w=1080')",
        }}
      ></div>

      {/* Soft blur and brightness overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-brightness-105 backdrop-blur-[2px] z-0"></div>

      {/* Centered Content with Animation */}
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="landing-content text-center text-white space-y-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#f4a261] to-[#e76f51] bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            MunchMates Admin
          </h1>
          <p className="text-2xl md:text-3xl mb-10 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Elevate your catering experience with seamless management.
          </p>

          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#d99152] text-white px-7 py-4 rounded-full font-semibold text-base shadow-md border-2 border-white/80 hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d99152]/30"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Login Form */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} onLogin={onLogin} />}
    </div>
  );
};

// Custom CSS animations injected
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.2; }
  }

  .landing-content {
    animation: fadeIn 1s ease-out forwards;
  }

  .before\\:animate-pulse {
    animation: pulse 2s infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default LandingPage;
