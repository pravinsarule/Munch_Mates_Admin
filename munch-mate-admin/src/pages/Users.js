import React from "react";
import UserManagement from "../components/UserManagement";

const Users = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Users</h1>
      <UserManagement />
    </div>
  );
};

export default Users;