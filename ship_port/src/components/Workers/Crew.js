import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { serviceConfig } from "../../settings";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddCrew from "./AddCrew";

export default function Crew() {
  var br = 1;
  const [shipPort, setShipPort] = useState(null);
  const [crew, setCrew] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [Roles, setRoles] = useState();

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios
      .get(`${serviceConfig.URL}/crew/getAllByShipPortId/` + params.id)
      .then((response) => {
        setCrew(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve crew");
      });

    axios
      .get(`${serviceConfig.URL}/crew/getAllRoles/`)
      .then((response) => {
        setRoles(response.data);
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

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);

  return (
    <div>
      <h1
        style={{
          "text-align": "center",
        }}
      >
        Table of ship crew for ship port: {shipPort?.name}
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
            <th class="w-12.5">Role</th>
          </tr>
        </thead>
        <tbody>
          {crew?.map((s) => (
            <tr key={s.id} onClick={() => setSelectedCrew(s)}>
              <td>{br++}</td>
              <td>{s.name + " " + s.surname}</td>
              <td>{s.age}</td>
              <td>{s.salary}</td>
              <td>{s.yearsOfWorking}</td>
              <td>{s.isAvailable ? "yes" : "no"}</td>
              <td>{s.sailingHoursTotal}</td>
              <td>{Roles[s.role]}</td>
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
        // onClick={() => {
        //   editShipCaptainClick();
        // }}
        size="lg"
      >
        Edit ship captain
      </Button>
      <Button
        style={{
          margin: 5,
        }}
        size="lg"
        // onClick={() => {
        //   deleteShipCaptain();
        // }}
      >
        Delete
      </Button>
      <AddCrew
        showAddDialog={showAddDialog}
        onChange={handleChangeDisplayAddDialog}
      />
    </div>
  );
}
