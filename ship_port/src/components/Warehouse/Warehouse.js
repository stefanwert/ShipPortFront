import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../../settings";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import AddWarehouse from "./AddWarehouse";
import EditWarehouse from "./EditWarehouse";

export default function Warehouse() {
  var [warehouses, setWarehouses] = useState();
  var [shipPort, setShipPort] = useState();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [shipPortId, setshipPortId] = useState(null);

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);
  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);

  var br = 1;
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    setshipPortId(params.id);
    axios
      .get(`${serviceConfig.URL}/warehouse/getAllByShipPortId/` + params.id)
      .then((response) => {
        setWarehouses(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });

    axios
      .get(`${serviceConfig.URL}/shipport/getById/` + params.id)
      .then((response) => {
        setShipPort(response.data);
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
        // setShipPorts(response.data);
        window.location.href = "/warehouses?id=" + shipPortId;
      })
      .catch(() => {
        console.log("didnt deleted ShipPort");
      });
  };

  return (
    <div>
      <h1
        style={{
          "text-align": "center",
        }}
      >
        Table of warehouses for ship port: {shipPort?.name}
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
          "text-align": "center",
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
        <AddWarehouse
          showAddDialog={showAddDialog}
          onChange={handleChangeDisplayAddDialog}
        />
        <EditWarehouse
          showEditDialog={showEditDialog}
          warehouse={selectedWarehouse}
          onChange={handleChangeDisplayEditDialog}
        />
      </div>
    </div>
  );
}
