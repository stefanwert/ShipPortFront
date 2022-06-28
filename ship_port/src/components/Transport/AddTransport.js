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

export default function AddTransport(props) {
  const [TimeFrom, setTimeFrom] = useState(new Date());
  const [TimeTo, setTimeTo] = useState(new Date());
  const [selectedShip, setSelectedShip] = useState({});
  const [shipList, setShipList] = useState([]);
  const [shipCaptainsSelected, setShipCaptainsSelected] = useState([]);
  const [shipCaptainList, setShipCaptainList] = useState([]);
  const [currentShipCaptain, setCurrentShipCaptain] = useState();
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [shipPortList, setShipPortList] = useState([]);
  const [shipPortFrom, setShipPortFrom] = useState({ name: "" });
  const [shipPortTo, setShipPortTo] = useState({ name: "" });

  useEffect(() => {
    axios
      .get(`${serviceConfig.URL}/shipport/getAll/`)
      .then((response) => {
        setShipPortList(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });
  }, []);

  //test
  useEffect(() => {
    console.log(selectedCrew);
  }, [selectedCrew]);

  useEffect(() => {
    if (shipPortFrom == null) return;
    axios
      .get(`${serviceConfig.URL}/ship/getAllByShipPortId/` + shipPortFrom?.id)
      .then((response) => {
        setShipList(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });

    axios
      .get(`${serviceConfig.URL}/crew/getAllByShipPortId/` + shipPortFrom?.id)
      .then((response) => {
        setCrewList(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });

    axios
      .get(
        `${serviceConfig.URL}/shipCaptain/getAllByShipPortId/` +
          shipPortFrom?.id
      )
      .then((response) => {
        setShipCaptainList(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });
  }, [shipPortFrom]);

  const AddTransportClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios({
      method: "post",
      url: `${serviceConfig.URL}/Transport/`,
      data: {
        TimeFrom: TimeFrom,
        TimeTo: TimeTo,
        Ship: selectedShip,
        ShipCaptains: shipCaptainsSelected,
        Crew: selectedCrew,
        ShipPortFrom: shipPortFrom,
        ShipPortTo: shipPortTo,
        //
        // public DateTime TimeFrom { get; set; }
        // public DateTime TimeTo { get; set; }
        // public ShipDTO Ship { get; set; }
        // public ICollection<ShipCaptainDTO> ShipCaptains { get; set; }
        // public ShipCaptainDTO CurrentShipCaptain { get; set; }
        // public ICollection<CrewDTO> Crew { get; set; }
        // public ShipPortDTO ShipPortFrom { get; set; }
        // public ShipPortDTO ShipPortTo { get; set; }
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
    <Modal show={props.showAddDialog} onHide={handleClose}>
      <Form>
        <div
          style={{
            margin: "10px",
          }}
        >
          <Form.Group className="data-Time-Picker">
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
          </Form.Group>

          <Form.Group>
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
          </Form.Group>
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

          <Button onClick={AddTransportClick} variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
