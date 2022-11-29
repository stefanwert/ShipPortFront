import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateTransport, updateShowAddCargo, updateReloadCargoListOnPropChange } from './Slice/addTransport'
import axios from "axios";
import { serviceConfig } from "../../settings";
import UploadImage from "../Upload/UploadImage";


export default function AddCargo(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [flammable, setFlammable] = useState(false);
  const showAddCargo = useSelector((state) => state.addTransport.showAddCargo);
  const transportToAdd = useSelector((state) => state.addTransport.transportToAdd);
  const dispatch = useDispatch();

  const handleClose = (event) => {
    // Here, we invoke the callback with the new value
    props.onChange(false);
    dispatch(updateShowAddCargo(false));
    dispatch(updateReloadCargoListOnPropChange());
  };

  const AddCargo = (e) => {
    e.preventDefault();
    // const params = new Proxy(new URLSearchParams(window.location.search), {
    //   get: (searchParams, prop) => searchParams.get(prop),
    // });
    axios({
      method: "post",
      url: `${serviceConfig.URL}/cargo/`,
      data: {
        Name: name,
        Quantity: quantity,
        Flammable: flammable,
        Image: image,
        WarehouseId: transportToAdd?.Warehouse?.id,
      },
    })
      .then((response) => {
        //window.location.href = "/clerk?id=" + shipPortId;
        handleClose();
      })
      .catch((e) => {
        console.log("didnt added cargo ");
        console.error(e, e.stack);
      });
  };

  const handleImageUploaded = React.useCallback((newValue) => {
    debugger;
    setImage(newValue);
  }, []);

  return (
    <Modal show={true} onHide={handleClose}>
    <div className="m-3">
      <Form>
        <div
          style={{
            margin: "10px",
          }}
        >
          <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                value={quantity}
                type="number"
                min={0}
                placeholder="Enter quantity"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                onChange={(e) => {
                  setFlammable(!flammable);
                }}
                checked={flammable === true ? "on" : ""}
                type="switch"
                label="Is flammable"
              />
            </Form.Group>
            
        </div>
      </Form>
      <div className="flex-column">
        <UploadImage
          onChange={handleImageUploaded}
        />
        <Button onClick={AddCargo} variant="primary" type="submit">
          Add Cargo
        </Button>
      </div>
    </div>
  </Modal>
  );
}
