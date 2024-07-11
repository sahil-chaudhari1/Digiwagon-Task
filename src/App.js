import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MaterialForm from './components/MaterialForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<MaterialForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
