import logo from "./logo.svg";
import "./App.css";
import TestComponent from "./components/TestComponent";
import Warehouse from "./components/Warehouse";
import "bootstrap/dist/css/bootstrap.min.css";
import ShipPorts from "./components/ShipPorts";

function App() {
  return (
    <div className="App">
      {/* <Warehouse /> */}
      <ShipPorts />
    </div>
  );
}

export default App;
