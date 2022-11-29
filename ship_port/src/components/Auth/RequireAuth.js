import React from 'react';
import { Navigate } from 'react-router-dom'
import { useState } from "react";

export default function RequireAuth({ children }) {
  const  authed = window.localStorage.getItem('token') != null;
  const [startDate, setStartDate] = useState(new Date());
  return authed === true ? children : <Navigate to="/login"/>;
}

