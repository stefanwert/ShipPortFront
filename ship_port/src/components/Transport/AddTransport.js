import React, { useEffect, useTransition } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { serviceConfig } from "../../settings";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-dropdown-select";
import ShipPorts from "../ShipPorts";
import { useSelector, useDispatch } from 'react-redux'
import { updateTransport, updateShowCargoList} from './Slice/addTransport'

export default function AddTransport(props) {
  const [TimeFrom, setTimeFrom] = useState(new Date());
  const [TimeTo, setTimeTo] = useState(new Date());
  const [selectedShip, setSelectedShip] = useState({});
  const [shipList, setShipList] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [warhouseList, setWarhouseList] = useState([]);
  const [shipCaptainsSelected, setShipCaptainsSelected] = useState([]);
  const [shipCaptainList, setShipCaptainList] = useState([]);
  const [currentShipCaptain, setCurrentShipCaptain] = useState();
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [shipPortList, setShipPortList] = useState([]);
  const [shipPortFrom, setShipPortFrom] = useState({ name: "" });
  const [shipPortTo, setShipPortTo] = useState({ name: "" });
  const dispatch = useDispatch();
  const showAddCargo = useSelector((state) => state.addTransport.showAddCargo);

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
    if (shipPortFrom?.id === null || shipPortFrom?.id === undefined) return;
    // setSelectedWarehouse(null);
    // setSelectedShip(null);
    // setSelectedCrew(null);
    // setShipCaptainsSelected(null);
    axios
      .get(`${serviceConfig.URL}/ship/getAllByShipPortId/` + shipPortFrom?.id)
      .then((response) => {
        setShipList(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ship ports");
      });

    axios
    .get(`${serviceConfig.URL}/Warehouse/getAllByShipPortId/` + shipPortFrom?.id)
    .then((response) => {
      setWarhouseList(response.data);
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
  
  const OpenCargoListWindow = (e) =>{
    e.preventDefault();
    if(shipPortFrom.name.length === 0){
      alert("Select ship from from!");
      return;
    }
    if(shipPortTo.name.length === 0){
      alert("Select ship port to!");
      return;
    }
    if(selectedShip && Object.keys(selectedShip).length === 0 && Object.getPrototypeOf(selectedShip) === Object.prototype){
      alert("Select ship!");
      return;
    }
    if(selectedWarehouse && Object.keys(selectedWarehouse).length === 0 && Object.getPrototypeOf(selectedWarehouse) === Object.prototype){
      alert("Select warehouse!");
      return;
    }
    if(selectedCrew.length === 0){
      alert("Select crew!");
      return;
    }
    if(shipCaptainsSelected.length === 0){
      alert("Select ship captains!");
      return;
    }
    const data = {
      TimeFrom: TimeFrom,
      TimeTo: TimeTo,
      Ship: selectedShip,
      ShipCaptains: shipCaptainsSelected,
      Crew: selectedCrew,
      ShipPortFrom: shipPortFrom,
      ShipPortTo: shipPortTo,
      Warehouse: selectedWarehouse,
    };
    dispatch(updateTransport(data));
    dispatch(updateShowCargoList(true));
    handleClose();
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
            <Form.Label>Select warehouse </Form.Label>
            <Select
              disabled={false}
              placeholder="Select role"
              options={warhouseList}
              labelField="name"
              valueField="id"
              values={[selectedWarehouse]}
              onChange={(values) => {
                setSelectedWarehouse(values[0]);
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
          <Button onClick={OpenCargoListWindow} variant="primary" type="submit">
            Next
          </Button>
          {/* <Button onClick={AddTransportClick} variant="primary" type="submit">
            Submit
          </Button> */}
        </div>
      </Form>
    </Modal>
  );
}
