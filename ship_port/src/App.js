import logo from "./logo.svg";
import "./App.css";
import Warehouse from "./components/Warehouse";
import "bootstrap/dist/css/bootstrap.min.css";
import ShipPorts from "./components/ShipPorts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";

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
      </Routes>
    </Router>
  );
}

export default App;
