const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  containerId: { type: String, required: true },
  route: [{ type: String }], // Array of locations
  currentLocation: { type: String, required: true },
  eta: { type: Date },
  status: { type: String, enum: ['In Transit', 'Delivered', 'Delayed'], default: 'In Transit' },
});

module.exports = mongoose.model('Shipment', shipmentSchema);
