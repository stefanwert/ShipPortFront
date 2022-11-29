import React from 'react'
import ShipPorts from './ShipPorts'
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from "react";
import AllWarehouse from './Warehouse/AllWarehouse';

export default function Home() {
  const t = jwt_decode(localStorage.getItem('token'))
  const [user, setUser] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token != null)
      setUser(jwt_decode(localStorage.getItem('token')));
  });

  const getRole = () => {
    return user != null? user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : "";
  };

  return (
    <div>
      {getRole() ==="Admin"?
        <AllWarehouse />
      :
        <ShipPorts/>
      }
    </div>
  )
}
