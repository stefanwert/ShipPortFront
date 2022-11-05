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

export default function EditShipCaptain(props) {
  const [shipCaptainList, setShipCaptainList] = useState([]);
  const [currentShipCaptain, setCurrentShipCaptain] = useState({ name: "" });
  const [selectedTransport, setSelectedTransport] = useState(null);

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
    setCurrentShipCaptain({ name: " " });
    setShipCaptainList([]);
  };
  useEffect(() => {
    console.log(currentShipCaptain, shipCaptainList);
  }, [shipCaptainList]);
  useEffect(() => {
    setSelectedTransport(props?.selectedTransport);
    if (
      props?.selectedTransport?.shipCaptains !== undefined &&
      props?.selectedTransport?.shipCaptains !== null
    ) {
      setShipCaptainList(props?.selectedTransport?.shipCaptains);
    }
    if (
      props?.selectedTransport?.currentShipCaptain !== undefined &&
      props?.selectedTransport?.currentShipCaptain !== null
    ) {
      setCurrentShipCaptain(props?.selectedTransport?.currentShipCaptain);
    }
  }, [props]);
  const EditTransportClick = (e) => {
    e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    axios({
      method: "put",
      url: `${serviceConfig.URL}/Transport/update`,
      data: {
        Id: selectedTransport?.id,
        CurrentShipCaptain: currentShipCaptain,
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

  return (
    <Modal show={props.showEditCaptainDialog} onHide={handleClose}>
      <Form>
        <div
          style={{
            margin: "10px",
          }}
        >
          <Form.Group>
            <Form.Label>Select main ship captain</Form.Label>
            <Select
              placeholder="Select role"
              options={shipCaptainList}
              labelField="name"
              valueField="id"
              values={[currentShipCaptain]}
              onChange={(values) => {
                setCurrentShipCaptain(values[0]);
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
