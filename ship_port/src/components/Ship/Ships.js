import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { serviceConfig } from "../../settings";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddShip from "./AddShip";
import EditShip from "./EditShip";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Ships() {
  var [ships, setShips] = useState();
  const [shipPort, setShipPort] = useState();
  const [selectedShip, setSelectedShip] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  var br = 1;

  const handleChangeDisplayAddDialog = React.useCallback((newValue) => {
    setShowAddDialog(newValue);
  }, []);

  const handleChangeDisplayEditDialog = React.useCallback((newValue) => {
    setShowEditDialog(newValue);
  }, []);

  const deleteShip = () => {
    if (selectedShip == null) {
      alert("Plase select ship first !");
      return;
    }
    axios({
      method: "delete",
      url: `${serviceConfig.URL}/ship/${selectedShip?.id}`,
    })
      .then((response) => {
        // setShipPorts(response.data);
        window.location.href = "/ships?id=" + shipPort.id;
      })
      .catch(() => {
        console.log("didnt deleted ship");
      });
  };

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios
      .get(`${serviceConfig.URL}/ship/getAllByShipPortId/` + params.id)
      .then((response) => {
        setShips(response.data);
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

  const columns = [
    // { field: "id", headerName: "Id", width: 90 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        console.log(params, "params for name");
        return params.row.name;
      },
    },
    {
      field: "Price",
      headerName: "Price",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return params.row.price;
      },
    },
  ];

  return (
    <div
      class="bg-image-ship-table"
    >
      {/* <img src={transport} alt="" class="bg-image-transport-table" /> */}
      <h1
        style={{
          "textAlign": "center",
        }}
      >
        Ships
      </h1>
      <h5
        style={{
          "textAlign": "center",
        }}
      >
        Ships for ship port: {shipPort?.name}
      </h5>
      <div class="table-Ships">
        { ships?
          <Box sx={{ height: 408, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={ships}
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
                setSelectedShip(params.row);
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
          Add ship
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          onClick={() => {
            setShowEditDialog(true);
          }}
          size="lg"
        >
          Edit ship
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          size="lg"
          onClick={() => {
            deleteShip();
          }}
        >
          Delete
        </Button>
        <AddShip
          showAddDialog={showAddDialog}
          onChange={handleChangeDisplayAddDialog}
        />
        <EditShip
          showEditDialog={showEditDialog}
          onChange={handleChangeDisplayEditDialog}
          ship={selectedShip}
        />
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
    // <div className="ships-table black-text">
    //   <h1
    //     style={{
    //       "textAlign": "center",
    //     }}
    //   >
    //     Table of ships for ship port: {shipPort?.name}
    //   </h1>
    //   <Table responsive bordered hover>
    //     <thead>
    //       <tr className="black-text">
    //         <th></th>
    //         <th>Name</th>
    //         <th>Price</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {ships?.map((s) => (
    //         <tr key={s.id} onClick={() => setSelectedShip(s)} className="black-text">
    //           <td>{br++}</td>
    //           <td>{s.name}</td>
    //           <td>{s.price}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </Table>
    //   <div
    //     style={{
    //       "textAlign": "center",
    //     }}
    //   >
    //     <Button
    //       style={{
    //         margin: 5,
    //       }}
    //       size="lg"
    //       onClick={() => {
    //         setShowAddDialog(true);
    //       }}
    //       >
    //       Add ship
    //     </Button>
    //     <Button
    //       style={{
    //         margin: 5,
    //       }}
    //       onClick={() => {
    //         setShowEditDialog(true);
    //       }}
    //       size="lg"
    //     >
    //       Edit ship
    //     </Button>
    //     <Button
    //       style={{
    //         margin: 5,
    //       }}
    //       size="lg"
    //       onClick={() => {
    //         deleteShip();
    //       }}
    //     >
    //       Delete
    //     </Button>
    //     <AddShip
    //       showAddDialog={showAddDialog}
    //       onChange={handleChangeDisplayAddDialog}
    //     />
    //     <EditShip
    //       showEditDialog={showEditDialog}
    //       onChange={handleChangeDisplayEditDialog}
    //       ship={selectedShip}
    //     />
    //   </div>

    // </div>
  );
}
