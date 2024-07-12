/* to restrict direct nevigation from admin to admin-dashboard without login using URL, similaraly from admin-dashboard to user-dashboard and
 user-dashboard to admin-dashboard this file is created.*/

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
