import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { serviceConfig } from "../../settings";
import { useEffect } from "react";

export default function EditShipCaptain(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(0);
  const [YearsOfWorking, setYearsOfWorking] = useState(0);
  const [Salary, setSalary] = useState(0);
  const [IsAvailable, setIsAvailable] = useState(true);
  const [SailingHoursTotal, setSailingHoursTotal] = useState(0);
  const [SailingHoursAsCaptain, setSailingHoursAsCaptain] = useState(0);
  const [shipPortId, setshipPortId] = useState(null);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  useEffect(() => {
    setName(props?.shipCaptain?.name);
    setSurname(props?.shipCaptain?.surname);
    setAge(props?.shipCaptain?.age);
    setYearsOfWorking(props?.shipCaptain?.yearsOfWorking);
    setSalary(props?.shipCaptain?.salary);
    setIsAvailable(props?.shipCaptain?.isAvailable);
    setSailingHoursTotal(props?.shipCaptain?.sailingHoursTotal);
    setSailingHoursAsCaptain(props?.shipCaptain?.sailingHoursAsCaptain);
  }, [props]);

  const EditShipCaptainClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    setshipPortId(params.id);
    axios({
      method: "put",
      url: `${serviceConfig.URL}/ShipCaptain/update`,
      data: {
        Id: props.shipCaptain.id,
        SailingHoursTotal: SailingHoursTotal,
        SailingHoursAsCaptain: SailingHoursAsCaptain,
        Name: name,
        Surname: surname,
        Age: age,
        YearsOfWorking: YearsOfWorking,
        Salary: Salary,
        IsAvailable: IsAvailable,
        ShipPortId: params.id,
      },
    })
      .then((response) => {
        window.location.href = "/shipCaptains?id=" + params.id;
      })
      .catch((e) => {
        console.log("didnt added ship captain");
        console.error(e, e.stack);
      });
  };

  return (
    <Modal show={props.showEditDialog} onHide={handleClose}>
      <Form>
        <div
          style={{
            margin: "10px",
          }}
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              value={surname}
              min={0}
              placeholder="Enter surname"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
              type="number"
              min={0}
              placeholder="Enter age"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              value={Salary}
              type="number"
              min={0}
              placeholder="Enter salary"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Years Of Working</Form.Label>
            <Form.Control
              onChange={(e) => {
                setYearsOfWorking(e.target.value);
              }}
              value={YearsOfWorking}
              type="number"
              min={0}
              placeholder="Enter years of working"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sailing Hours As Captain</Form.Label>
            <Form.Control
              onChange={(e) => {
                setSailingHoursAsCaptain(e.target.value);
              }}
              value={SailingHoursAsCaptain}
              type="number"
              min={0}
              placeholder="Enter Sailing Hours As Captain"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sailing Hours Total</Form.Label>
            <Form.Control
              onChange={(e) => {
                setSailingHoursTotal(e.target.value);
              }}
              value={SailingHoursTotal}
              type="number"
              min={0}
              placeholder="Enter Sailing Hours Total"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              onChange={(e) => {
                setIsAvailable(!IsAvailable);
              }}
              checked={IsAvailable === true ? "on" : ""}
              type="switch"
              label="Is available"
            />
          </Form.Group>

          <Button
            onClick={EditShipCaptainClick}
            variant="primary"
            type="submit"
          >
            Edit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
