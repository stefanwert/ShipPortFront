import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serviceConfig } from "../../settings";
import { Button } from "react-bootstrap";
import AddTransport from "./AddTransport";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditTransport from "./EditTransport";
import EditShipCaptain from "./EditShipCaptain";
import AddCargo from "./AddCargo";
import CargoList from "./CargoList";
import { useSelector, useDispatch } from 'react-redux'
import CargoPreview from "./CargoPreview";
import { updateshowCargoPreview } from './Slice/addTransport'

export default function Transport() {
  const [Transports, setTransports] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null);
  var [shipPort, setShipPort] = useState();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAddCargoDialog, setShowAddCargoDialog] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditCaptainDialog, setShowEditCaptainDialog] = useState(false);
  const showCargoList = useSelector((state) => state.addTransport.showCargoList);
  const showAddCargo = useSelector((state) => state.addTransport.showAddCargo);
  const showCargoPreview = useSelector((state) => state.addTransport.showCargoPreview);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    axios
      .get(`${serviceConfig.URL}/transport/getAllByShipPortId/` + params.id)
      .then((response) => {
        setTransports(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });

    axios
      .get(`${serviceConfig.URL}/shipport/getById/` + params.id)
      .then((response) => {
        setShipPort(response.data);
      })
      .catch(() => {
        console.log("didnt retrieve warehouse");
      });
  }, []);

  useEffect(() => {
    console.log(Transports.length);
  }, [Transports]);

  useEffect(() => {
    console.log("selected transport: "+selectedTransport);
  }, [selectedTransport]);

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);

  const handleNext = React.useCallback(() => {
    alert("next");
    setShowAddDialog(false);
    setShowAddCargoDialog(true);

  }, []);

  const handleChangeDisplayAddCargoDialog = React.useCallback((newValue) => {
    setShowAddCargoDialog(newValue);
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);
  const handleChangeDisplayEditCaptainDialog = React.useCallback((newValue) => {
    setShowEditCaptainDialog(newValue);
  }, []);
  const columns = [
    // { field: "id", headerName: "Id", width: 90 },
    {
      field: "timeFrom",
      headerName: "Time from",
      width: 200,
      editable: false,
      valueFormatter: (params) => {
        var strings = params.value.split("T");
        return strings[0] + " " + strings[1];
      },
    },
    {
      field: "timeTo",
      headerName: "Time to",
      width: 200,
      editable: false,
      valueFormatter: (params) => {
        var strings = params.value.split("T");
        return strings[0] + " " + strings[1];
      },
    },
    {
      field: "Ship name",
      headerName: "Ship name",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params?.row?.ship?.name;
      },
    },
    {
      field: "Ship port from",
      headerName: "Ship port from",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params?.row?.shipPortFrom?.name;
      },
    },
    {
      field: "Ship port to",
      headerName: "Ship port to",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params?.row?.shipPortTo?.name;
      },
    },
    {
      field: "transportState",
      headerName: "State",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        if (!params?.row?.transportState.endsWith("Transport"))
          return params?.row?.transportState;
        var strings = params?.row?.transportState.split("Transport");
        return strings[0];
      },
    },
  ];

  const deleteTransport = () => {
    if (selectedTransport == null) {
      alert("Plase select transport first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/transport/${selectedTransport?.id}`,
    })
      .then((response) => {
        // setShipPorts(response.data);
        window.location.href = "/transport?id=" + shipPort?.id;
      })
      .catch(() => {
        console.log("didnt deleted transport");
      });
  };

  const showCargo = () => {
    dispatch(updateshowCargoPreview(true));
  };

  const cancelTransport = () => {
    if (selectedTransport == null) {
      alert("Plase select transport first !");
      return;
    }
    axios({
      method: "put",
      url: `${serviceConfig.URL}/transport/cancel/${selectedTransport?.id}`,
    })
      .then((response) => {
        // setShipPorts(response.data);
        window.location.href = "/transport?id=" + shipPort?.id;
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  function renderCellState(params: GridCellParams<number>) {
    if (params.field === "transportState") {
      if (params.value == null) return;

      if (params?.value.includes("Finished"))
        return "table-cell-state-finished";

      if (params?.value.includes("Canceled"))
        return "table-cell-state-canceled";

      if (params?.value.includes("Transporting"))
        return "table-cell-state-transporting";

      if (params?.value.includes("Creating"))
        return "table-cell-state-creating";
    } else {
      return "standard-cell";
    }
  }

  return (
    <div
      class="bg-image-transport-table"
    >
      {/* <img src={transport} alt="" class="bg-image-transport-table" /> */}
      <h1
        style={{
          "textAlign": "center",
        }}
      >
        Transport
      </h1>
      <h5
        style={{
          "textAlign": "center",
        }}
      >
        Ship port: {shipPort?.name}
      </h5>
      <div class="table-Transport">
        <Box sx={{ height: 408, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={Transports}
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
              setSelectedTransport(params.row);
            }}
            getCellClassName={renderCellState}
          />
        </Box>
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
          Add transport
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          onClick={() => {
            if (selectedTransport == null) {
              alert("Please select some transport");
              return;
            }
            if (
              selectedTransport.transportState !== "CreatingTransport" &&
              selectedTransport.transportState !== "Transporting"
            ) {
            }
            if (selectedTransport.transportState === "Transporting") {
              setShowEditCaptainDialog(true);
              return;
            }
            if (selectedTransport.transportState === "CreatingTransport") {
              setShowEditDialog(true);
              return;
            }
            alert(
              "You can only edit transport with creating status and transporting!"
            );
            return;
          }}
          size="lg"
        >
          Edit transport
        </Button>
        {/* <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            deleteTransport();
          }}
        >
          Delete transport
        </Button> */}
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            cancelTransport();
          }}
        >
          Cancel transport
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            showCargo();
          }}
        >
          Show Cargo
        </Button>
        {
          showAddDialog&&
          <AddTransport
            showAddDialog={showAddDialog}
            onChange={handleChangeDisplayAddDialog}
          />
        }
        <EditTransport
          showEditDialog={showEditDialog}
          selectedTransport={selectedTransport}
          onChange={handleChangeDisplayEditDialog}
        />
        <EditShipCaptain
          showEditCaptainDialog={showEditCaptainDialog}
          selectedTransport={selectedTransport}
          onChange={handleChangeDisplayEditCaptainDialog}
        />
        {
          showAddCargo&& 
          <AddCargo 
          onChange={handleChangeDisplayAddCargoDialog}
          />
        }
        {
          showCargoList&&
          <CargoList/>
        }
        {
          showCargoPreview&&
          <CargoPreview
            cargos = {selectedTransport?.cargos}
          />
        }
        {/* <AddWarehouse
          showAddDialog={showAddDialog}
          onChange={handleChangeDisplayAddDialog}
        />
        <EditWarehouse
          showEditDialog={showEditDialog}
          warehouse={selectedWarehouse}
          onChange={handleChangeDisplayEditDialog} 
        />*/}
      </div>
    </div>
  );
}
