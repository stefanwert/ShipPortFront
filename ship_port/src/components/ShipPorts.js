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

export default function ShipPorts() {
  const [ShipPorts, setShipPorts] = useState();
  const [selectedShipPort, setSelectedShipPort] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const showOptions = (shipPort) => {
    setShow(true);
    setSelectedShipPort(shipPort);
  };

  return (
    <div>
      <h1>ovo je zaglavlje</h1>
      <p>zaglavlje</p>
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
            <tr key={s.id} onClick={() => showOptions(s)}>
              <td>{br++}</td>
              <td>{s.name}</td>
              <td>{s.timeOfCreation.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    </div>
  );
}
