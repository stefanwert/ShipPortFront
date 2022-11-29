import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../settings";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ship from "../resource/ship.jfif";
import workers from "../resource/workers.jpg";
import transport from "../resource/transport.jpg";
import warehouse from "../resource/warehouse.jpg";
import shipCaptain from "../resource/shipCaptain.jpg";
import crew from "../resource/crew.jpg";
import clerk from "../resource/clerk.jfif";
import "react-datepicker/dist/react-datepicker.css";
import EditShipPort from "./EditShipPort";
import AddShipPort from "./AddShipPort";
import { isAdimnCalculate} from '../components/Transport/Slice/addTransport'
import { useSelector, useDispatch } from 'react-redux'
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function ShipPorts() {
  const [ShipPorts, setShipPorts] = useState();
  const [selectedShipPort, setSelectedShipPort] = useState(null);
  const [show, setShow] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [hideFirstModal, setHideFirstModal] = useState(false);
  const [hideSecundModal, setHideSecundModal] = useState(true);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.addTransport.isAdmin);
  

  const handleClose = () => {
    setHideFirstModal(false);
    setHideSecundModal(true);
    setShow(false);
  };
  const handleCloseOfAddDialog = () => setShowAddDialog(false);
  var br = 0;

  useEffect(() => {
    dispatch(isAdimnCalculate());
    axios
      .get(`${serviceConfig.URL}/shipport/getAll`)
      .then((response) => {
        setShipPorts(response.data);
        console.log(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve ShipPorts");
      });
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setDisplayEditDialog(newValue);
  }, []);

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);

  const showOptions = () => {
    setShow(true);
  };

  const deleteShipPort = () => {
    if (selectedShipPort == null) {
      alert("Plase select ship port first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/shipport/${selectedShipPort?.id}`,
    })
      .then((response) => {
        setShipPorts(response.data);
        console.log(response.data);
        window.location.href = "/";
      })
      .catch(() => {
        console.log("didnt deleted ShipPort");
      });
  };

  const editShipPortClick = () => {
    if (selectedShipPort == null) return;
    setDisplayEditDialog(true);
  };

  const columns = [
    // { field: "id", headerName: "Id", width: 90 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params.row.name;
      },
    },
    {
      field: "timeOfCreation",
      headerName: "Time of creation",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        var strings = params.value.split("T");
        return strings[0];
      },
    },
    {
      field: "Number Of Worker",
      headerName: "Number Of Workers",
      width: 160,
      editable: false,
      valueGetter: (params) => {
        console.log(params);
        return params.row.numberOfWorker;
      },
    },
    {
      field: "Number Of Ships",
      headerName: "Number Of Ships",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        console.log(params);
        return params.row.numberOfShips;
      },
    },
    {
      field: "Number Of Warehouses",
      headerName: "Number Of Warehouses",
      width: 200,
      editable: false,
      valueGetter: (params) => {
        console.log(params);
        return params.row.numberOfWarehouses;
      },
    },
    {
      field: "Number Of Warehouses That Store Flammable",
      headerName: "Number Of Warehouses That Store Flammable",
      width: 350,
      editable: false,
      valueGetter: (params) => {
        console.log(params);
        return params.row.numberOfWarehousesThatStoreFlammable;
      },
    },
  ];

  return (
    <div className="bg-image-ship-port-table ">
      <h1
        style={{
          "textAlign": "center",
        }}
      >
        Table of ship ports
      </h1>
      <div class="table-Ships-Port">

        { ShipPorts?
          <Box sx={{ height: 408, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={ShipPorts}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
              onCellClick={(
                params: GridCellParams,
                event: MuiEvent<React.MouseEvent>
                ) => {
                  event.defaultMuiPrevented = true;
                  setSelectedShipPort(params.row);
                }}
                onRowDoubleClick={(
                  params: GridCellParams,
                  event: MuiEvent<React.MouseEvent>
                ) => {
                    event.defaultMuiPrevented = true;
                    setSelectedShipPort(params.row);
                    setShow(true);
                  }}
                />
          </Box>
          :null
        }
      </div>

      <div
        style={{
          "textAlign": "center",
        }}
      >
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            setShowAddDialog(true);
          }}
        >
          Add ship port
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            editShipPortClick();
          }}
        >
          Edit ship port
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            deleteShipPort();
          }}
        >
          Delete ship port
        </Button>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <div class="wrapper">
            <div class="two-blox">
              <div
                hidden={hideFirstModal}
                class="box"
                onClick={() => {
                  window.location.href = "/ships?id=" + selectedShipPort.id;
                }}
                style={{
                  backgroundImage: `url(${ship}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                ships
              </div>
              <div
                hidden={hideFirstModal}
                class="box"
                style={{
                  backgroundImage: `url(${workers}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
                onClick={() => {
                  setHideFirstModal(true);
                  setHideSecundModal(false);
                }}
              >
                workers
              </div>
            </div>
            {
              isAdmin?
              <div class="two-blox">
                <div
                  hidden={hideFirstModal}
                  onClick={() => {
                    window.location.href =
                      "/warehouses?id=" + selectedShipPort.id;
                  }}
                  class="box"
                  style={{
                    backgroundImage: `url(${warehouse}) `,
                    "background-repeat": "no-repeat",
                    backgroundSize: "100%",
                  }}
                >
                  warehouses
                </div>
                <div
                  hidden={hideFirstModal}
                  class="box"
                  style={{
                    backgroundImage: `url(${transport}) `,
                    "background-repeat": "no-repeat",
                    backgroundSize: "100%",
                  }}
                  onClick={() => {
                    window.location.href = "/transport?id=" + selectedShipPort.id;
                  }}
                >
                  transports
                </div>
              </div>
              :null
            }
            

            <div class="two-blox">
              <div
                hidden={hideSecundModal}
                class="box"
                onClick={() => {
                  window.location.href =
                    "/shipcaptains?id=" + selectedShipPort.id;
                }}
                style={{
                  backgroundImage: `url(${shipCaptain}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                Ship captains
              </div>
              <div
                hidden={hideSecundModal}
                class="box"
                onClick={() => {
                  window.location.href = "/crew?id=" + selectedShipPort.id;
                }}
                style={{
                  backgroundImage: `url(${crew}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                Crew
              </div>
            </div>

            <div class="two-blox">
              <div
                hidden={hideSecundModal}
                class="box"
                style={{
                  backgroundImage: `url(${clerk}) `,
                  "background-repeat": "no-repeat",
                  backgroundSize: "100%",
                }}
                onClick={() => {
                  window.location.href = "/clerk?id=" + selectedShipPort.id;
                }}
              >
                Warhouse clerks
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <AddShipPort
        showAddDialog={showAddDialog}
        onChange={handleChangeDisplayAddDialog}
      />

      <EditShipPort
        displayDialog={displayEditDialog}
        shipPort={selectedShipPort}
        onChange={handleChangeDisplayEditDialog}
      />
    </div>
  );
}
