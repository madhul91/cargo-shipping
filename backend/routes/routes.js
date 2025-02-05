const express = require('express');
const router = express.Router();
// const Shipment = require('./models/mode.js');
const Shipment = require('../models/mode.js');  // ✅ Correct


// Retrieve all shipments
router.get('/shipments', async (req, res) => {
  const shipments = await Shipment.find();
  res.json(shipments);
});

// Retrieve specific shipment details
router.get('/shipment/:id', async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  res.json(shipment);
});

// Update shipment location
router.post('/shipment/:id/update-location', async (req, res) => {
  const { newLocation } = req.body;
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, { currentLocation: newLocation }, { new: true });
  res.json(shipment);
});

// Retrieve ETA
router.get('/shipment/:id/eta', async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  res.json({ eta: shipment.eta });
});

// Create a new shipment
router.post('/shipment', async (req, res) => {
  const newShipment = new Shipment(req.body);
  await newShipment.save();
  res.status(201).json(newShipment);
});

module.exports = router;
