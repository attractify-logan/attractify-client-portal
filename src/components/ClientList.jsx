import React, { useState, useEffect } from 'react';
import { localStorageDB } from '../lib/localStorage';

const ClientList = ({ onEditClient }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const result = await localStorageDB.getClients();
      
      if (result.error) throw result.error;
      setClients(result.data || []);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId, companyName) => {
    if (!confirm(`Are you sure you want to delete ${companyName}?`)) {
      return;
    }

    try {
      const result = await localStorageDB.deleteClient(clientId);
      
      if (result.error) throw result.error;
      
      // Remove from local state
      setClients(clients.filter(client => client.id !== clientId));
      alert('Client deleted successfully');
    } catch (err) {
      console.error('Error deleting client:', err);
      alert('Failed to delete client');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading clients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">No clients yet</div>
        <div className="text-gray-400">Add your first client to get started</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Clients ({clients.length})
        </h2>
        <button
          onClick={fetchClients}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {client.company_name}
                </h3>
                
                <div className="space-y-1 text-sm text-gray-600">
                  {client.contact_name && (
                    <div>
                      <span className="font-medium">Contact:</span> {client.contact_name}
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium">Email:</span> 
                    <a 
                      href={`mailto:${client.contact_email}`}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      {client.contact_email}
                    </a>
                  </div>
                  
                  {client.contact_phone && (
                    <div>
                      <span className="font-medium">Phone:</span> 
                      <a 
                        href={`tel:${client.contact_phone}`}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                      >
                        {client.contact_phone}
                      </a>
                    </div>
                  )}
                  
                  {client.website && (
                    <div>
                      <span className="font-medium">Website:</span> 
                      <a 
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 ml-1"
                      >
                        {client.website}
                      </a>
                    </div>
                  )}
                  
                  {client.industry && (
                    <div>
                      <span className="font-medium">Industry:</span> {client.industry}
                    </div>
                  )}
                </div>

                {client.notes && (
                  <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Notes:</span> {client.notes}
                  </div>
                )}

                <div className="mt-2 text-xs text-gray-500">
                  Added: {new Date(client.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                {onEditClient && (
                  <button
                    onClick={() => onEditClient(client)}
                    className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClient(client.id, client.company_name)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;

