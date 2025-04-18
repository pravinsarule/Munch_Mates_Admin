// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom/client"; // 🔁 updated import
import App from "./App";
import "./index.css"; 

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ new way
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
