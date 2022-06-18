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
import shipCaptain from "../resource/shipCaptain.jpg";
import crew from "../resource/crew.jpg";
import clerk from "../resource/clerk.jfif";

import "react-datepicker/dist/react-datepicker.css";
import EditShipPort from "./EditShipPort";
import AddShipPort from "./AddShipPort";

export default function ShipPorts() {
  const [ShipPorts, setShipPorts] = useState();
  const [selectedShipPort, setSelectedShipPort] = useState(null);
  const [show, setShow] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [hideFirstModal, setHideFirstModal] = useState(false);
  const [hideSecundModal, setHideSecundModal] = useState(true);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);

  const handleClose = () => {
    setHideFirstModal(false);
    setHideSecundModal(true);
    setShow(false);
  };
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

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
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
    if (selectedShipPort == null) return;
    setDisplayEditDialog(true);
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
                hidden={hideFirstModal}
                class="box"
                onClick={() => {
                  window.location.href = "/ships?id=" + selectedShipPort.id;
                }}
                style={{
                  backgroundImage: `url(${ship}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                ships
              </div>
              <div
                hidden={hideFirstModal}
                class="box"
                style={{
                  backgroundImage: `url(${workers}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
                onClick={() => {
                  setHideFirstModal(true);
                  setHideSecundModal(false);
                }}
              >
                workers
              </div>
            </div>
            <div class="two-blox">
              <div
                hidden={hideFirstModal}
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
                hidden={hideFirstModal}
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

            <div class="two-blox">
              <div
                hidden={hideSecundModal}
                class="box"
                onClick={() => {
                  window.location.href =
                    "/shipcaptains?id=" + selectedShipPort.id;
                }}
                style={{
                  backgroundImage: `url(${shipCaptain}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                Ship captains
              </div>
              <div
                hidden={hideSecundModal}
                class="box"
                onClick={() => {
                  window.location.href = "/crew?id=" + selectedShipPort.id;
                }}
                style={{
                  backgroundImage: `url(${crew}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                Crew
              </div>
            </div>

            <div class="two-blox">
              <div
                hidden={hideSecundModal}
                class="box"
                style={{
                  backgroundImage: `url(${clerk}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
                onClick={() => {
                  window.location.href = "/clerk?id=" + selectedShipPort.id;
                }}
              >
                Warhouse clerks
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <AddShipPort
        showAddDialog={showAddDialog}
        onChange={handleChangeDisplayAddDialog}
      />

      <EditShipPort
        displayDialog={displayEditDialog}
        shipPort={selectedShipPort}
        onChange={handleChangeDisplayEditDialog}
      />
    </div>
  );
}
