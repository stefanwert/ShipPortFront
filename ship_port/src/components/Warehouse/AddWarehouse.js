import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { serviceConfig } from "../../settings";

export default function AddWarehouse(props) {
  const [storeFlammableCargo, setstoreFlammableCargo] = useState(false);
  const [cargoCapacity, setcargoCapacity] = useState(0);
  const [warehouseName, setwarehouseName] = useState("");

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    setstoreFlammableCargo("");
    setcargoCapacity(0);
    setwarehouseName("");
    props.onChange(false);
  };

  const AddWarehouseClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios({
      method: "post",
      url: `${serviceConfig.URL}/Warehouse/`,
      data: {
        Name: warehouseName,
        StoreFlammableCargo: storeFlammableCargo,
        CargoCapacity: cargoCapacity,
        ShipPortId: params.id,
      },
    })
      .then((response) => {
        window.location.href = "/warehouses?id=" + params.id;
      })
      .catch((e) => {
        console.log("didnt added warehouse");
        console.error(e, e.stack);
      });
  };

  return (
    <Modal show={props.showAddDialog} onHide={handleClose}>
      <Form>
        <div
          style={{
            margin: "10px",
          }}
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={warehouseName}
              onChange={(e) => {
                setwarehouseName(e.target.value);
              }}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cargo capacity</Form.Label>
            <Form.Control
              onChange={(e) => {
                setcargoCapacity(e.target.value);
              }}
              value={cargoCapacity}
              type="number"
              min={0}
              placeholder="Enter cargo capacity"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              onChange={(e) => {
                setstoreFlammableCargo(!storeFlammableCargo);
              }}
              checked={storeFlammableCargo === true ? "on" : ""}
              type="switch"
              label="Store flammable cargo"
            />
          </Form.Group>
          <Button onClick={AddWarehouseClick} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
