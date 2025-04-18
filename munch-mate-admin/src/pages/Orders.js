

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