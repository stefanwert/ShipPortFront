import React, { useEffect, useTransition } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { serviceConfig } from "../../settings";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-dropdown-select";
import ShipPorts from "../ShipPorts";

export default function EditTransport(props) {
  const [selectedShip, setSelectedShip] = useState({});
  const [shipList, setShipList] = useState([]);
  const [shipCaptainsSelected, setShipCaptainsSelected] = useState([]);
  const [shipCaptainList, setShipCaptainList] = useState([]);
  const [currentShipCaptain, setCurrentShipCaptain] = useState();
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [shipPortList, setShipPortList] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null);

  useEffect(() => {
    setSelectedTransport(props?.selectedTransport);
    axios
      .get(
        `${serviceConfig.URL}/ship/getAllByShipPortId/` +
          props?.selectedTransport?.shipPortFrom?.id
      )
      .then((response) => {
        setShipList(response.data);
        setSelectedShip(props?.selectedTransport?.ship);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });
    axios
      .get(
        `${serviceConfig.URL}/crew/getAllByShipPortId/` +
          props?.selectedTransport?.shipPortFrom?.id
      )
      .then((response) => {
        setCrewList(response.data);
        setSelectedCrew(props?.selectedTransport?.crew);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });

    axios
      .get(
        `${serviceConfig.URL}/shipCaptain/getAllByShipPortId/` +
          props?.selectedTransport?.shipPortFrom?.id
      )
      .then((response) => {
        setShipCaptainList(response.data);
        setShipCaptainsSelected(props?.selectedTransport?.shipCaptains);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });
  }, [props]);

  useEffect(() => {
    console.log(props);
  }, []);

  const EditTransportClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    axios({
      method: "put",
      url: `${serviceConfig.URL}/Transport/`,
      data: {
        //   Id:
        Ship: selectedShip,
        ShipCaptains: shipCaptainsSelected,
        Crew: selectedCrew,
      },
    })
      .then((response) => {
        window.location.href = "/transport?id=" + params.id;
      })
      .catch((e) => {
        console.error(e, e.stack);
        alert(e.response.data);
      });
  };

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
  };

  return (
    <Modal show={props.showEditDialog} onHide={handleClose}>
      <Form>
        <div
          style={{
            margin: "10px",
          }}
        >
          {/* <Form.Group className="data-Time-Picker">
            <Form.Label>Time from</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={TimeFrom}
                onChange={(newValue) => {
                  setTimeFrom(newValue);
                }}
              />
            </LocalizationProvider>
          </Form.Group>
          <Form.Group className="data-Time-Picker">
            <Form.Label>Time to</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={TimeTo}
                onChange={(newValue) => {
                  setTimeTo(newValue);
                }}
              />
            </LocalizationProvider>
          </Form.Group> */}

          {/* <Form.Group>
            <Form.Label>Select ship port from</Form.Label>
            <Select
              placeholder="Select role"
              options={shipPortList}
              labelField="name"
              valueField="id"
              values={[shipPortFrom]}
              onChange={(values) => {
                setShipPortFrom(values[0]);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select ship port to</Form.Label>
            <Select
              placeholder="Select role"
              options={shipPortList}
              labelField="name"
              valueField="id"
              values={[shipPortTo]}
              onChange={(values) => {
                if (shipPortFrom.id == values[0]?.id) {
                  alert("Cant put same ship port to as from !");
                  return;
                }
                setShipPortTo(values[0]);
              }}
            />
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Select ship </Form.Label>
            <Select
              disabled={false}
              placeholder="Select role"
              options={shipList}
              labelField="name"
              valueField="id"
              values={[selectedShip]}
              onChange={(values) => {
                setSelectedShip(values[0]);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select crew members </Form.Label>
            <Select
              disabled={false}
              placeholder="Select role"
              options={crewList}
              labelField="name"
              valueField="id"
              values={selectedCrew}
              multi
              onChange={(values) => {
                setSelectedCrew(values);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select ship captains</Form.Label>
            <Select
              disabled={false}
              placeholder="Select role"
              options={shipCaptainList}
              labelField="name"
              valueField="id"
              values={shipCaptainsSelected}
              multi
              onChange={(values) => {
                setShipCaptainsSelected(values);
              }}
            />
          </Form.Group>

          <Button onClick={EditTransportClick} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
