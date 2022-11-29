import React from 'react';
import { Navigate } from 'react-router-dom'
import { useState } from "react";
import jwt_decode from 'jwt-decode';

export default function RequireAuthAdmin({ children }) {
  const  token = window.localStorage.getItem('token');
  if(token === null){
    alert("You don't have access or you are not loged in");
    return <Navigate to="/login"/>;
  }
  var user = jwt_decode(token);
  if(user === null)
    return <Navigate to="/login"/>;
  const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if(role !== "Admin"){
    alert("You don't have access or you are not loged in");
    return <Navigate to="/home"/>;
  }
  return  children;
}

