import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { serviceConfig } from "../settings";

export default function AddShip(props) {
  const [price, setPrice] = useState(0);
  const [shipName, setShipName] = useState("");
  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  const AddShipClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios({
      method: "post",
      url: `${serviceConfig.URL}/ship/`,
      data: {
        Name: shipName,
        Price: price,
        ShipPortId: params.id,
      },
    })
      .then((response) => {
        window.location.href = "/ships?id=" + params.id;
      })
      .catch((e) => {
        console.log("didnt added ship");
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
            <Form.Label>Name asddasa</Form.Label>
            <Form.Control
              value={shipName}
              onChange={(e) => {
                setShipName(e.target.value);
              }}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              type="number"
              min={0}
              placeholder="Enter price"
            />
          </Form.Group>
          <Button onClick={AddShipClick} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
