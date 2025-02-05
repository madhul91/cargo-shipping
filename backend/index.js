const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const shipmentRoutes = require('./routes/routes.js');
// const Shipment = require('../models/shipment.model');  // ✅ Correct


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.use('/api', shipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
