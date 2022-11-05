import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { serviceConfig } from "../../settings";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddCrew from "./AddCrew";
import EditCrew from "./EditCrew";
import AddClerk from "./AddClerk";
import EditClerk from "./EditClerk";

export default function Clerk() {
  const [shipPort, setShipPort] = useState(null);
  const [crew, setCrew] = useState(null);
  const [selectedClerk, setSelectedClerk] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [Roles, setRoles] = useState();

  var br = 1;

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios
      .get(
        `${serviceConfig.URL}/WarehouseClerk/getAllByShipPortId/` + params.id
      )
      .then((response) => {
        setCrew(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve crew");
      });

    axios
      .get(`${serviceConfig.URL}/shipport/getById/` + params.id)
      .then((response) => {
        setShipPort(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship port");
      });

    axios
      .get(`${serviceConfig.URL}/warehouseclerk/getAllRoles/`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve roles");
      });
  }, []);

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);

  const deleteClerk = () => {
    if (selectedClerk == null) {
      alert("Plase select clerk first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/WarehouseClerk/${selectedClerk?.id}`,
    })
      .then((response) => {
        window.location.href = "/clerk?id=" + shipPort.id;
      })
      .catch(() => {
        console.log("didnt deleted clerk");
      });
  };

  return (
    <div>
      <h1
        style={{
          "textAlign": "center",
        }}
      >
        Table of warehouse cler for ship port: {shipPort?.name}
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
            <th class="w-12.5">Role</th>
          </tr>
        </thead>
        <tbody>
          {crew?.map((s) => (
            <tr key={s.id} onClick={() => setSelectedClerk(s)}>
              <td>{br++}</td>
              <td>{s.name + " " + s.surname}</td>
              <td>{s.age}</td>
              <td>{s.salary}</td>
              <td>{s.yearsOfWorking}</td>
              <td>{s.isAvailable ? "yes" : "no"}</td>
              <td>{Roles[s.clerkRole]}</td>
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
        Add warehouse clerk
      </Button>
      <Button
        style={{
          margin: 5,
        }}
        onClick={() => {
          setShowEditDialog(true);
        }}
        size="lg"
      >
        Edit warehouse clerk
      </Button>
      <Button
        style={{
          margin: 5,
        }}
        size="lg"
        onClick={() => {
          deleteClerk();
        }}
      >
        Delete
      </Button>
      <AddClerk
        showAddDialog={showAddDialog}
        onChange={handleChangeDisplayAddDialog}
      />
      <EditClerk
        onChange={handleChangeDisplayEditDialog}
        showEditDialog={showEditDialog}
        clerk={selectedClerk}
      />
    </div>
  );
}
