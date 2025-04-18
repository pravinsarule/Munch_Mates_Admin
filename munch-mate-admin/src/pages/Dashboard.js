// import React, { useEffect } from "react";
// import StatsCard from "../components/StatsCard";
// import OrdersTable from "../components/OrdersTable";
// import MenuManagement from "../components/MenuManagement";

// const Dashboard = ({ users, pendingOrders, revenue, activeChefs, orders, occasions, addOrder, updateOccasion, removeOccasion }) => {
//   useEffect(() => {
//     console.log("Dashboard loaded");
//   }, []);

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatsCard title="Total Users" value={users} icon="👤" />
//         <StatsCard title="Pending Orders" value={pendingOrders} icon="📝" />
//         <StatsCard title="Total Revenue" value={`$${revenue}`} icon="💰" />
//         <StatsCard title="Active Chefs" value={activeChefs} icon="👨‍🍳" />
//       </div>
//       {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <OrdersTable orders={orders} addOrder={addOrder} />
//         <MenuManagement occasions={occasions} updateOccasion={updateOccasion} removeOccasion={removeOccasion} />
//       </div> */}
//     </>
//   );
// };

// export default Dashboard;




import React, { useEffect } from "react";
import StatsCard from "../components/StatsCard";
import OrdersTable from "../components/OrdersTable";
import MenuManagement from "../components/MenuManagement";

const Dashboard = ({
  users = 0,
  pendingOrders = 0,
  revenue = 0,
  activeChefs = 0,
  orders = [],
  occasions = [],
  addOrder = () => {},
  updateOccasion = () => {},
  removeOccasion = () => {},
}) => {
  useEffect(() => {
    console.log("Dashboard loaded");
  }, []);

  return (
    <>
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Users" value={users} icon="👤" />
        <StatsCard title="Pending Orders" value={pendingOrders} icon="📝" />
        <StatsCard title="Total Revenue" value={`$${revenue}`} icon="💰" />
        <StatsCard title="Active Chefs" value={activeChefs} icon="👨‍🍳" />
      </div>

      {/* Orders Table and Menu Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersTable orders={orders} addOrder={addOrder} />
        <MenuManagement
          occasions={occasions}
          updateOccasion={updateOccasion}
          removeOccasion={removeOccasion}
        />
      </div>
    </>
  );
};

export default Dashboard;
