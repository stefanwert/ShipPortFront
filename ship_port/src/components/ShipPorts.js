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
import EditShipPort from "./EditShipPort";

export default function ShipPorts() {
  const [ShipPorts, setShipPorts] = useState();
  const [selectedShipPort, setSelectedShipPort] = useState(null);
  const [show, setShow] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newShipName, setNewShipName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [displayEditDialog, setDisplayEditDialog] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseOfAddDialog = () => setShowAddDialog(false);
  var br = 0;

  useEffect(() => {
    axios
      .get(`${serviceConfig.URL}/shipport/getAll`)
      .then((response) => {
        setShipPorts(response.data);
        console.log(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ShipPorts");
      });
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setDisplayEditDialog(newValue);
  }, []);

  const showOptions = () => {
    setShow(true);
  };

  const deleteShipPort = () => {
    if (selectedShipPort == null) {
      alert("Plase select ship port first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/shipport/${selectedShipPort?.id}`,
    })
      .then((response) => {
        setShipPorts(response.data);
        console.log(response.data);
        window.location.href = "/";
      })
      .catch(() => {
        console.log("didnt deleted ShipPort");
      });
  };

  const editShipPortClick = () => {
    setDisplayEditDialog(true);
  };

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
        setShipPorts(response.data);
        console.log(response.data);
      })
      .catch(() => {
        console.log("didnt added ShipPort");
      });
  };

  return (
    <div>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>time of creation</th>
          </tr>
        </thead>
        <tbody>
          {ShipPorts?.map((s) => (
            <tr
              key={s.id}
              onClick={() => setSelectedShipPort(s)}
              onDoubleClick={() => showOptions()}
            >
              <td>{br++}</td>
              <td>{s.name}</td>
              <td>{s.timeOfCreation.substring(0, 10)}</td>
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
          Add ship port
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            editShipPortClick();
          }}
        >
          Edit ship port
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            deleteShipPort();
          }}
        >
          Delete ship port
        </Button>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <div class="wrapper">
            <div class="two-blox">
              <div
                class="box"
                style={{
                  backgroundImage: `url(${ship}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                ships
              </div>
              <div
                class="box"
                style={{
                  backgroundImage: `url(${workers}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                workers
              </div>
            </div>
            <div class="two-blox">
              <div
                onClick={() => {
                  window.location.href =
                    "/warehouses?id=" + selectedShipPort.id;
                }}
                class="box"
                style={{
                  backgroundImage: `url(${warehouse}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                warehouses
              </div>
              <div
                class="box"
                style={{
                  backgroundImage: `url(${transport}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                transports
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showAddDialog} onHide={handleCloseOfAddDialog}>
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
      <EditShipPort
        displayDialog={displayEditDialog}
        shipPort={selectedShipPort}
        onChange={handleChangeDisplayEditDialog}
      />
    </div>
  );
}
