import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../settings";
import Table from "react-bootstrap/Table";

export default function Warehouse() {
  var [warehouses, setWarehouses] = useState();
  var br = 1;
  useEffect(() => {
    axios
      .get(`${serviceConfig.URL}/warehouse/getAll`)
      .then((response) => {
        setWarehouses(response.data);
        console.log(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });
  }, []);
  return (
    <div>
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
    </div>
  );
}
