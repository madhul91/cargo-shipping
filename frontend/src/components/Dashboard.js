import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShipments, updateShipmentLocation } from '../features/shipmentsSlice';
import MapComponent from './MapComponent'; // We'll create this map component next
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { shipments, loading } = useSelector((state) => state.shipments);

  const [selectedShipment, setSelectedShipment] = useState(null);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const handleUpdateLocation = (shipmentId) => {
    const newLocation = prompt('Enter new location:'); // Simple prompt for updating location
    if (newLocation) {
      dispatch(updateShipmentLocation({ id: shipmentId, newLocation }));
    }
  };

  const handleSelectShipment = (shipment) => {
    setSelectedShipment(shipment); // Set selected shipment for map
  };

  if (loading) return <p>Loading shipments...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shipment Tracker Dashboard</h2>

      {/* Button to add a new shipment */}
      <Link to="/add-shipment">
        <button className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add New Shipment
        </button>
      </Link>

      {/* Table for listing all shipments */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Shipment ID</th>
            <th className="px-4 py-2 border-b">Container ID</th>
            <th className="px-4 py-2 border-b">Current Location</th>
            <th className="px-4 py-2 border-b">ETA</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment._id}>
              <td className="px-4 py-2 border-b">{shipment.shipmentId}</td>
              <td className="px-4 py-2 border-b">{shipment.containerId}</td>
              <td className="px-4 py-2 border-b">{shipment.currentLocation}</td>
              <td className="px-4 py-2 border-b">{shipment.eta ? new Date(shipment.eta).toLocaleString() : 'N/A'}</td>
              <td className="px-4 py-2 border-b">{shipment.status}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleSelectShipment(shipment)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                >
                  View on Map
                </button>
                <button
                  onClick={() => handleUpdateLocation(shipment._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update Location
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render MapComponent if a shipment is selected */}
      {selectedShipment && <MapComponent shipment={selectedShipment} />}
    </div>
  );
};

export default Dashboard;
