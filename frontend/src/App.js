import React from 'react';
import { Provider } from 'react-redux'; // Redux Provider to pass the store
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Router for navigation
import Dashboard from './components/Dashboard'; // Import Dashboard component
import AddShipment from './components/AddShipment'; // Import AddShipment component
import { store } from './redux/store'; // Import Redux store

function App() {
  return (
    <Provider store={store}> {/* Redux Provider to wrap the app */}
      <Router>
        <div>
          <header className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl">Cargo Shipment Tracker</h1>
          </header>
          
          <main className="p-4">
            <Routes>
              {/* Define routes */}
              <Route path="/" element={<Dashboard/>} /> {/* Dashboard Route */}
              <Route path="/add-shipment" element={<AddShipment/>} /> {/* Add New Shipment Route */}
              {/* You can add more routes here if needed */}
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
