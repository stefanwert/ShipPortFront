import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../settings";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ship from "../resource/ship.jfif";
import workers from "../resource/workers.jpg";
import transport from "../resource/transport.jpg";
import warehouse from "../resource/warehouse.jpg";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditShipPort(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [newShipName, setNewShipName] = useState("");

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    setStartDate(new Date(props?.shipPort?.timeOfCreation));
    setNewShipName(props?.shipPort?.name);
  }, [props]);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  const editShipPort = () => {
    var ship = props.shipPort;
    ship.name = newShipName;
    ship.timeOfCreation = startDate;

    axios({
      method: "put",
      url: `${serviceConfig.URL}/shipport/update`,
      data: ship,
    })
      .then((response) => {
        window.location.reload(true);
      })
      .catch(() => {
        console.log("didnt edited ShipPort");
      });
  };
  return (
    <>
      <Modal show={props.displayDialog} onHide={handleClose}>
        <Form>
          <div
            style={{
              margin: "10px",
            }}
          >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={newShipName}
                placeholder="Enter name"
                onChange={(e) => {
                  setNewShipName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date of creation</Form.Label>
              <DatePicker
                selected={startDate}
                dateFormat="MM/dd/yyyy"
                onChange={(date: Date) => setStartDate(date)}
              />
            </Form.Group>
            <Button onClick={editShipPort} variant="primary" type="submit">
              Edit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
