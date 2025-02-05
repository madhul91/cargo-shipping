import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all shipments
export const fetchShipments = createAsyncThunk('shipments/fetch', async () => {
  const response = await axios.get('http://localhost:5000/api/shipments');
  return response.data;
});

// Async thunk to update a shipment's location
export const updateShipmentLocation = createAsyncThunk(
  'shipments/updateLocation',
  async ({ id, newLocation }) => {
    const response = await axios.post(`http://localhost:5000/api/shipment/${id}/update-location`, { newLocation });
    return response.data;
  }
);

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState: {
    shipments: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(updateShipmentLocation.fulfilled, (state, action) => {
        const updatedShipment = action.payload;
        state.shipments = state.shipments.map((shipment) =>
          shipment._id === updatedShipment._id ? updatedShipment : shipment
        );
      });
  },
});

export default shipmentSlice.reducer;
