import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import { serviceConfig } from "../../settings";
import Modal from "react-bootstrap/Modal";

export default function EditShip(props) {
  const [price, setPrice] = useState(0);
  const [shipName, setShipName] = useState("");
  const [shipPortId, setShipPortId] = useState(null);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  useEffect(() => {
    setShipName(props?.ship?.name);
    setShipPortId(props?.ship?.shipPortId);
    setPrice(props?.ship?.price);
  }, [props]);

  const EditShipClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios({
      method: "put",
      url: `${serviceConfig.URL}/ship/update`,
      data: {
        Id: props.ship.id,
        Name: shipName,
        Price: price,
        ShipPortId: params.id,
      },
    })
      .then((response) => {
        window.location.href = "/ships?id=" + params.id;
      })
      .catch((e) => {
        console.log("didnt edited ship");
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
          <Button onClick={EditShipClick} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
