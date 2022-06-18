import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { serviceConfig } from "../../settings";
import Select from "react-dropdown-select";

export default function EditCrew(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(0);
  const [YearsOfWorking, setYearsOfWorking] = useState(0);
  const [Salary, setSalary] = useState(0);
  const [IsAvailable, setIsAvailable] = useState(true);
  const [SailingHoursTotal, setSailingHoursTotal] = useState(0);
  const [RoleSelected, setSelectedRole] = useState([1, 2, 3]);
  const [Roles, setRoles] = useState();
  const [CrewId, setCrewId] = useState();
  const [shipPortId, setshipPortId] = useState(null);

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    setshipPortId(params.id);
    setCrewId(props?.crew?.id);
    setName(props?.crew?.name);
    setSurname(props?.crew?.surname);
    setAge(props?.crew?.age);
    setYearsOfWorking(props?.crew?.yearsOfWorking);
    setSalary(props?.crew?.salary);
    setIsAvailable(props?.crew?.isAvailable);
    setSailingHoursTotal(props?.crew?.sailingHoursTotal);
    axios
      .get(`${serviceConfig.URL}/crew/getAllRoles/`)
      .then((response) => {
        var list = [];
        var counter = 0;
        response.data.forEach(function (element) {
          list.push({ name: element, val: counter++ });
        });
        setRoles(list);
        setSelectedRole(list[props?.crew?.role]);
      })
      .catch(() => {
        console.log("didnt retrieve roles");
      });
  }, [props]);

  useEffect(() => {
    console.log(RoleSelected);
  }, [RoleSelected]);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  const EditCrewClick = (e) => {
    e.preventDefault();

    axios({
      method: "put",
      url: `${serviceConfig.URL}/Crew/update`,
      data: {
        Id: CrewId,
        SailingHoursTotal: SailingHoursTotal,
        Role: RoleSelected?.val,
        Name: name,
        Surname: surname,
        Age: age,
        YearsOfWorking: YearsOfWorking,
        Salary: Salary,
        IsAvailable: IsAvailable,
        ShipPortId: shipPortId,
      },
    })
      .then((response) => {
        window.location.href = "/crew?id=" + shipPortId;
      })
      .catch((e) => {
        console.log("didnt edited crew");
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
          <Button onClick={EditCrewClick} variant="primary" type="submit">
            Edit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
