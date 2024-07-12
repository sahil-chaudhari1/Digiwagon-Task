import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaterialForm from './components/MaterialForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MaterialForm />} />
        <Route path="/user-dashboard" element={<ProtectedRoute component={UserDashboard} allowedRole="User" />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} allowedRole="Admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
