import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { serviceConfig } from "../../settings";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Crew() {
  var br = 1;
  const [shipPort, setShipPort] = useState(null);
  const [crew, setCrew] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(null);

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
          {crew?.map((s) => (
            <tr key={s.id} onClick={() => setSelectedCrew(s)}>
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
        // onClick={() => {
        //   setShowAddDialog(true);
        // }}
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
    </div>
  );
}
