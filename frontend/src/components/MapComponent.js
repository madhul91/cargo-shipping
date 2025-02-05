import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Leaflet CSS
import axios from 'axios';

// Custom icon for the current location
const locationIcon = new Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Location_dot.png',  // Customize with your icon
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

function MapComponent({ shipmentId }) {
  const [shipmentData, setShipmentData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [eta, setEta] = useState(null);

  // Fetch shipment data (current location and route data)
  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shipment/${shipmentId}`);
        const data = response.data;
        setShipmentData(data);
        setLocations(data.route);  // Assuming `route` contains an array of location points
        setCurrentLocation(data.currentLocation);
        setEta(data.eta);  // Assuming `eta` is provided
      } catch (error) {
        console.error('Error fetching shipment data:', error);
      }
    };

    fetchShipmentData();
  }, [shipmentId]);

  return (
    <div>
      <h2>Shipment Location: {shipmentId}</h2>
      <div>Current ETA: {eta}</div>
      <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={10} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]} icon={locationIcon}>
            <Popup>Current Location</Popup>
          </Marker>
        )}
        {locations.length > 0 && (
          <Polyline positions={locations.map(location => [location.lat, location.lng])} color="blue" />
        )}
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>Location {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
