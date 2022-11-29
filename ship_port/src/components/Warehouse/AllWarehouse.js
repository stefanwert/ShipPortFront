import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../../settings";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import AddWarehouse from "./AddWarehouse";
import EditWarehouse from "./EditWarehouse";
import CargoPreview from "../Transport/CargoPreview";
import { useSelector, useDispatch } from 'react-redux'
import { updateshowCargoPreview } from "../Transport/Slice/addTransport";

export default function AllWarehouse() {
  var [warehouses, setWarehouses] = useState();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const showCargoPreview = useSelector((state) => state.addTransport.showCargoPreview);
  const dispatch = useDispatch();

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);
  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);

  var br = 1;
  useEffect(() => {
    axios
      .get(`${serviceConfig.URL}/warehouse/GetAllWithCargos`)
      .then((response) => {
        setWarehouses(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });
  }, []);

  const editWarehouseClick = () => {
    if (selectedWarehouse == null) return;
    setShowEditDialog(true);
  };

  const deleteWarehouse = () => {
    if (selectedWarehouse == null) {
      alert("Plase select warehouse first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/warehouse/${selectedWarehouse?.id}`,
    })
      .then((response) => {
        window.location.href = "/allwarehouse"
      })
      .catch(() => {
        console.log("didnt deleted warehouse");
      });
  };

  const showCargo = () => {
    dispatch(updateshowCargoPreview(true));
  };

  return (
    <div>
      <h1
        style={{
          "textAlign": "center",
        }}
      >
        All warehouses 
      </h1>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Store flammable cargo</th>
            <th>Cargo capacity</th>
          </tr>
        </thead>
        <tbody>
          {warehouses?.map((w) => (
            <tr key={w.id} onClick={() => setSelectedWarehouse(w)}>
              <td>{br++}</td>
              <td>{w.name}</td>
              <td>{w.storeFlammableCargo === true ? "yes" : "no"}</td>
              <td>{w.cargoCapacity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          "textAlign": "center",
        }}
      >
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            setShowAddDialog(true);
          }}
        >
          Add warehouse
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          onClick={() => editWarehouseClick()}
          size="lg"
        >
          Edit warehouse
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            deleteWarehouse();
          }}
        >
          Delete warehouse
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            showCargo();
          }}
        >
          Show Cargo
        </Button>
        <AddWarehouse
          showAddDialog={showAddDialog}
          onChange={handleChangeDisplayAddDialog}
        />
        <EditWarehouse
          showEditDialog={showEditDialog}
          warehouse={selectedWarehouse}
          onChange={handleChangeDisplayEditDialog}
        />
        {
          showCargoPreview&&
          <CargoPreview
            cargos = {selectedWarehouse?.cargoDTOs}
          />
        }
      </div>
    </div>
  );
}
