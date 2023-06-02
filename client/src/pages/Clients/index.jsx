import React, { useState } from 'react';

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Client A', email: 'clienta@example.com', phone: '1234567890' },
    { id: 2, name: 'Client B', email: 'clientb@example.com', phone: '9876543210' },
    // Add more client data as needed
  ]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Client Management</h1>
      <div className="flex justify-end mb-4">
        <button type='button' className="bg-blue-500 text-white py-2 px-4 rounded">Add Client</button>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="py-2 px-4">{client.id}</td>
              <td className="py-2 px-4">{client.name}</td>
              <td className="py-2 px-4">{client.email}</td>
              <td className="py-2 px-4">{client.phone}</td>
              <td className="py-2 px-4">
                <button type='button' className="bg-blue-500 text-white py-1 px-2 rounded mr-2" onClick={(e)=>setClients(e.target.value)}>Edit</button>
                <button type='button' className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
