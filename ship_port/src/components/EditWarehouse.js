import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import { serviceConfig } from "../settings";

export default function EditWarehouse(props) {
  const [storeFlammableCargo, setstoreFlammableCargo] = useState(false);
  const [cargoCapacity, setcargoCapacity] = useState(0);
  const [warehouseName, setwarehouseName] = useState("");

  useEffect(() => {
    setstoreFlammableCargo(props?.warehouse?.storeFlammableCargo);
    setcargoCapacity(props?.warehouse?.cargoCapacity);
    setwarehouseName(props?.warehouse?.name);
  }, [props]);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  const EditWarehouseClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios({
      method: "put",
      url: `${serviceConfig.URL}/Warehouse/update`,
      data: {
        Id: props.warehouse.id,
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
    <Modal show={props.showEditDialog} onHide={handleClose}>
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
          <Button onClick={EditWarehouseClick} variant="primary" type="submit">
            Edit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
