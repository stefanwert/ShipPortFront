import logo from "./logo.svg";
import "./App.css";
import Warehouse from "./components/Warehouse/Warehouse";
import "bootstrap/dist/css/bootstrap.min.css";
import ShipPorts from "./components/ShipPorts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Ships from "./components/Ship/Ships";
import ShipCaptains from "./components/Workers/ShipCaptains";
import Crew from "./components/Workers/Crew";
import Clerk from "./components/Workers/Clerk";
import Transport from "./components/Transport/Transport";
import Login from "./components/Login";
import Register from "./components/Register";
import '../src/styles/login.css';
import Home from "./components/Home";
import { useState, useEffect } from "react";
import AllWarehouse from "./components/Warehouse/AllWarehouse";
import RequireAuth from "./components/Auth/RequireAuth";
import RequireAuthAdmin from "./components/Auth/RequireAuthAdmin";
import jwt_decode from 'jwt-decode';

function App() {
  const [isMenager, setIsMenager] = useState(false);
  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.reload(false);
  }
  useEffect(() => {
    const  token = window.localStorage.getItem('token');
    if(token === null){
      return;
    }
    var user = jwt_decode(token);
    if(user === null)
      return ;
    const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    setIsMenager(role==="Admin");
  }, []);

  return (
    <Router>
      <Nav  className="navbar navbar-dark bg-primary">
        { !window.localStorage.getItem('token')?
        <>
            <Nav.Item>
              <Nav.Link href="/Register">Register</Nav.Link>
            </Nav.Item>
            <Nav.Item class="logout-btn">
              <Nav.Link href="/Login">Login</Nav.Link>
            </Nav.Item>
          </>
          : 
        <>
          <Nav.Item>
            <Nav.Link href="/">ShipPorts</Nav.Link>
          </Nav.Item>
          {isMenager?
            <Nav.Item>
              <Nav.Link href="/AllWarehouse">Warehouses</Nav.Link>
            </Nav.Item>
            :
            null
          }
          <Nav.Item class="logout-btn">
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
        </>
        }
        
      </Nav>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <ShipPorts />
          </RequireAuth>
        } />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Warehouses" element={
          <RequireAuthAdmin>
            <Warehouse />
          </RequireAuthAdmin>} />
        <Route path="/Ships" element={
          <RequireAuth>
            <Ships />
          </RequireAuth>} />
        <Route path="/ShipCaptains" element={
          <RequireAuth>
            <ShipCaptains />
          </RequireAuth>} />
        <Route path="/Crew" element={
          <RequireAuth>
            <Crew />
          </RequireAuth>
          } />
        <Route path="/Clerk" element={
          <RequireAuth>
            <Clerk />
          </RequireAuth>
          } />
        <Route path="/Transport" element={
          <RequireAuthAdmin>
            <Transport />
          </RequireAuthAdmin>
          } />
        <Route path="/Home" element={
          <RequireAuth>
            <Home />
          </RequireAuth>} />
        <Route path="/AllWarehouse" element={
          <RequireAuthAdmin>
            <AllWarehouse />
          </RequireAuthAdmin>} />
      </Routes>
    </Router>
  );
}

export default App;
