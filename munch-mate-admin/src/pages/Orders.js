// import React, { useState, useEffect } from "react";

// const Orders = () => {
//   const [orders, setOrders] = useState([
//     { id: 1, customer: "Alice", occasion: "Wedding", status: "Pending", date: "2025-04-04" },
//     { id: 2, customer: "Bob", occasion: "Birthday", status: "Completed", date: "2025-04-03" },
//     { id: 3, customer: "Charlie", occasion: "Corporate", status: "In Progress", date: "2025-04-02" },
//   ]);

//   const addOrder = () => {
//     const newOrder = {
//       id: orders.length + 1,
//       customer: `User${orders.length + 1}`,
//       occasion: ["Wedding", "Birthday", "Corporate"][Math.floor(Math.random() * 3)],
//       status: ["Pending", "Completed", "In Progress"][Math.floor(Math.random() * 3)],
//       date: new Date().toISOString().split("T")[0],
//     };
//     setOrders([...orders, newOrder]);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (Math.random() > 0.7) addOrder();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [orders]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">Order ID</th>
//               <th className="p-2">Customer</th>
//               <th className="p-2">Occasion</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">#{order.id}</td>
//                 <td className="p-2">{order.customer}</td>
//                 <td className="p-2">{order.occasion}</td>
//                 <td className="p-2">{order.status}</td>
//                 <td className="p-2">{order.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button
//         onClick={addOrder}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add Order
//       </button>
//     </div>
//   );
// };

// export default Orders;


import React from "react";
import OrdersTable from "../components/OrdersTable";

const Orders = ({ orders, addOrder }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Orders</h1>
      <OrdersTable orders={orders} addOrder={addOrder} />
    </div>
  );
};

export default Orders;