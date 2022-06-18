import logo from "./logo.svg";
import "./App.css";
import Warehouse from "./components/Warehouse";
import "bootstrap/dist/css/bootstrap.min.css";
import ShipPorts from "./components/ShipPorts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Ships from "./components/Ships";
import ShipCaptains from "./components/Workers/ShipCaptains";
import Crew from "./components/Workers/Crew";
import Clerk from "./components/Workers/Clerk";

function App() {
  return (
    <Router>
      <Nav className="navbar">
        <Nav.Item>
          <Nav.Link href="/">ShipPorts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/Warehouses">Warehouses</Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/" element={<ShipPorts />} />
        <Route path="/Warehouses" element={<Warehouse />} />
        <Route path="/Ships" element={<Ships />} />
        <Route path="/ShipCaptains" element={<ShipCaptains />} />
        <Route path="/Crew" element={<Crew />} />
        <Route path="/Clerk" element={<Clerk />} />
      </Routes>
    </Router>
  );
}

export default App;
