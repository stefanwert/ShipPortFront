import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { serviceConfig } from "../../settings";
import Select from "react-dropdown-select";

export default function AddCrew(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(0);
  const [YearsOfWorking, setYearsOfWorking] = useState(0);
  const [Salary, setSalary] = useState(0);
  const [IsAvailable, setIsAvailable] = useState(true);
  const [SailingHoursTotal, setSailingHoursTotal] = useState(0);
  const [RoleSelected, setSelectedRole] = useState([1, 2, 3]);
  const [Roles, setRoles] = useState();
  const [shipPortId, setshipPortId] = useState(null);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    setshipPortId(params.id);
    axios
      .get(`${serviceConfig.URL}/crew/getAllRoles/`)
      .then((response) => {
        var list = [];
        var counter = 0;
        response.data.forEach(function (element) {
          list.push({ name: element, val: counter++ });
        });
        setRoles(list);
        setSelectedRole(list[0]);
      })
      .catch(() => {
        console.log("didnt retrieve ship captain");
      });
  }, []);

  const AddCrew = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    setshipPortId(params.id);
    axios({
      method: "post",
      url: `${serviceConfig.URL}/crew/`,
      data: {
        SailingHoursTotal: SailingHoursTotal,
        Name: name,
        Surname: surname,
        Age: age,
        YearsOfWorking: YearsOfWorking,
        Salary: Salary,
        IsAvailable: IsAvailable,
        ShipPortId: shipPortId,
        Role: RoleSelected.val,
      },
    })
      .then((response) => {
        window.location.href = "/crew?id=" + shipPortId;
      })
      .catch((e) => {
        console.log("didnt added ship");
        console.error(e, e.stack);
      });
  };

  return (
    <Modal show={props.showAddDialog} onHide={handleClose}>
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
          <Select
            placeholder="Select role"
            options={Roles}
            labelField="name"
            valueField="val"
            values={[RoleSelected]}
            onChange={(values) => setSelectedRole(values[0])}
          />
          <Button onClick={AddCrew} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
