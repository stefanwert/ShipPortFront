import React from "react";
import { useState } from "react";
import axios from "axios";
import { serviceConfig } from "../settings";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

export default function AddShipPort(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [newShipName, setNewShipName] = useState("");

  const addShipPort = () => {
    console.log(newShipName + "ship date:" + startDate);
    axios({
      method: "post",
      url: `${serviceConfig.URL}/shipport/`,
      data: {
        Name: newShipName,
        TimeOfCreation: startDate,
      },
    })
      .then((response) => {
        window.location.reload(true);
      })
      .catch(() => {
        console.log("didnt added ShipPort");
      });
  };

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
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
            <Form.Label value={newShipName}>Name</Form.Label>
            <Form.Control
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
              onChange={(date: Date) => setStartDate(date)}
            />
          </Form.Group>
          <Button onClick={addShipPort} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
