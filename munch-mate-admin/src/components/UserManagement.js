import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Customer", email: "alice@example.com" },
    { id: 2, name: "Bob", role: "Chef", email: "bob@example.com" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", role: "", email: "" });

  const addUser = () => {
    if (newUser.name && newUser.role && newUser.email) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", role: "", email: "" });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">User Management</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;