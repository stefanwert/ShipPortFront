import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { serviceConfig } from "../../settings";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddShipCaptain from "./AddShipCaptain";
import EditShipCaptain from "./EditShipCaptain";

export default function ShipCaptains() {
  const [shipcaptains, setShipCaptains] = useState(null);
  const [selectedShipcaptain, setSelectedShipCaptain] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [shipPort, setShipPort] = useState();
  const [shipPortId, setshipPortId] = useState(null);

  var br = 1;

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);

  const editShipCaptainClick = () => {
    if (selectedShipcaptain == null) return;
    setShowEditDialog(true);
  };

  const deleteShipCaptain = () => {
    if (selectedShipcaptain == null) {
      alert("Plase select ship captain first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/shipCaptain/${selectedShipcaptain?.id}`,
    })
      .then((response) => {
        window.location.href = "/shipcaptains?id=" + shipPortId;
      })
      .catch(() => {
        console.log("didnt deleted ship captain");
      });
  };

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    setshipPortId(params.id);
    axios
      .get(`${serviceConfig.URL}/shipCaptain/getAllByShipPortId/` + params.id)
      .then((response) => {
        setShipCaptains(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship captain");
      });

    axios
      .get(`${serviceConfig.URL}/shipport/getById/` + params.id)
      .then((response) => {
        setShipPort(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship port");
      });
  }, []);

  return (
    <div>
      <h1
        style={{
          "text-align": "center",
        }}
      >
        Table of ship captains for ship port: {shipPort?.name}
      </h1>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th class="w-12.5"></th>
            <th class="w-12.5">Name</th>
            <th class="w-12.5">Age</th>
            <th class="w-12.5">Salary</th>
            <th class="w-12.5">Years Of Working</th>
            <th class="w-12.5">Is available</th>
            <th class="w-12.5">Sailing Hours Total</th>
            <th class="w-12.5">Sailing Hours As Captain</th>
          </tr>
        </thead>
        <tbody>
          {shipcaptains?.map((s) => (
            <tr key={s.id} onClick={() => setSelectedShipCaptain(s)}>
              <td>{br++}</td>
              <td>{s.name + " " + s.surname}</td>
              <td>{s.age}</td>
              <td>{s.salary}</td>
              <td>{s.yearsOfWorking}</td>
              <td>{s.isAvailable ? "yes" : "no"}</td>
              <td>{s.sailingHoursTotal}</td>
              <td>{s.sailingHoursAsCaptain}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        style={{
          margin: 5,
        }}
        size="lg"
        onClick={() => {
          setShowAddDialog(true);
        }}
      >
        Add ship captain
      </Button>
      <Button
        style={{
          margin: 5,
        }}
        onClick={() => {
          editShipCaptainClick();
        }}
        size="lg"
      >
        Edit ship captain
      </Button>
      <Button
        style={{
          margin: 5,
        }}
        size="lg"
        onClick={() => {
          deleteShipCaptain();
        }}
      >
        Delete
      </Button>
      <AddShipCaptain
        showAddDialog={showAddDialog}
        onChange={handleChangeDisplayAddDialog}
      />
      <EditShipCaptain
        showEditDialog={showEditDialog}
        onChange={handleChangeDisplayEditDialog}
        shipCaptain={selectedShipcaptain}
      />
    </div>
  );
}
