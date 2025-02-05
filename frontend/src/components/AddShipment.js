import React, { useState } from 'react';

const AddShipment = () => {
  const [shipmentData, setShipmentData] = useState({
    shipmentId: '',
    containerId: '',
    currentLocation: '',
    route: [],
    eta: '',
    status: 'In Transit',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({
      ...shipmentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would send shipmentData to the backend here
    console.log('Shipment Data Submitted:', shipmentData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Shipment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Shipment ID</label>
          <input
            type="text"
            name="shipmentId"
            value={shipmentData.shipmentId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Container ID</label>
          <input
            type="text"
            name="containerId"
            value={shipmentData.containerId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Add more fields for currentLocation, route, etc. */}
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Shipment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShipment;
