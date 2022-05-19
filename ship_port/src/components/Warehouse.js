import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../settings";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function Warehouse() {
  var [warehouses, setWarehouses] = useState();
  var [shipPort, setShipPort] = useState();
  var br = 1;
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios
      .get(`${serviceConfig.URL}/warehouse/getAllByShipPortId/` + params.id)
      .then((response) => {
        setWarehouses(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });

    axios
      .get(`${serviceConfig.URL}/shipport/getById/` + params.id)
      .then((response) => {
        setShipPort(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });
  }, []);
  return (
    <div>
      <h1
        style={{
          "text-align": "center",
        }}
      >
        Table of warehouses for ship port: {shipPort?.name}
      </h1>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Store flammable cargo</th>
            <th>Cargo capacity</th>
          </tr>
        </thead>
        <tbody>
          {warehouses?.map((w) => (
            <tr>
              <td>{br++}</td>
              <td>{w.name}</td>
              <td>{w.storeFlammableCargo === true ? "yes" : "no"}</td>
              <td>{w.cargoCapacity}</td>
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
        >
          Add warehouse
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
        >
          Delete warehouse
        </Button>
      </div>
    </div>
  );
}
