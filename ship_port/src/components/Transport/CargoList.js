import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useTransition } from "react";
import { useState } from "react";
import { serviceConfig } from "../../settings";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from 'react-redux'
import { updateShowAddCargo, updateShowCargoList} from './Slice/addTransport'

export default function CargoList() {
    const [cargos, setCargos] = useState([]);
    const showCargoList = useSelector((state) => state.addTransport.showCargoList);
    const reloadCargoListOnPropChange = useSelector((state) => state.addTransport.reloadCargoListOnPropChange);
    const transportToAdd = useSelector((state) => state.addTransport.transportToAdd);
    const dispatch = useDispatch();
    
    useEffect(() => {
        axios
            .get(`${serviceConfig.URL}/cargo/GetAllThatIsNotTrasnporting?warehouseid=${transportToAdd?.Warehouse?.id}`)
            .then((response) => {
                setCargos(response.data);
            })
            .catch(() => {
            console.log("didnt retrieve ship ports");
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${serviceConfig.URL}/cargo/GetAllThatIsNotTrasnporting?warehouseid=${transportToAdd?.Warehouse?.id}`)
            .then((response) => {
                setCargos(response.data);
            })
            .catch(() => {
            console.log("didnt retrieve ship ports");
            });
    }, [reloadCargoListOnPropChange]);

    const selectCargo = (card) => {
        if(!card.hasOwnProperty('isSelected')){
            card.isSelected = true;
        }else{
            card.isSelected = ! card.isSelected;
        } 
        setCargos([...cargos]);
    };

    const AddNewCargo =(e)=>{
        dispatch(updateShowAddCargo(true));
    };

    const handleClose = (event) => {
        dispatch(updateShowCargoList(false));
    };

    const AddTransportClick = (e) => {
        e.preventDefault();
        debugger;
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        //create data
        let data = {
            ...transportToAdd

        };
        // var data = transportToAdd;
        data.Cargos = cargos.filter(function(item)
        {
            return item.hasOwnProperty('isSelected') && item.isSelected;
        });

        axios({
            method: "post",
            url: `${serviceConfig.URL}/Transport/`,
            data: data,
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
        <Modal show={true} onHide={handleClose}>
            <div className='grid-container-backgruond ' >
                <h1>SELECT CARGO:</h1>
                <div className='grid-container'>
                    {cargos.map(function(card, idx){
                        return (<Card id={card.id} key ={card.id} onClick={()=>selectCargo(card)} className="cargo-card" style={{ width: '18rem', border: card.isSelected? "5px solid black" : ""}}>
                        <Card.Img variant="top" src={card?.image} />
                        <Card.Body>
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Text>Test{card.isPressed? "hello": ""}</Card.Text>
                        <Card.Text>
                            Cargo quantity: {card.quantity}
                        </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                        <ListGroup.Item>Cargo is {card.flammable? "": "not"} flammable</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                        <Button>Select/Diselect</Button>
                        </Card.Body>
                    </Card>)
                    })}
                    <Card onClick={AddNewCargo} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/shipport-2c3ab.appspot.com/o/files%2Fplus-square-dotted.svg?alt=media&token=2421f5aa-07ac-43de-8677-4cdb229811e9" />
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            <Card.Title ><button className='btn fs-5'>Add new Cargo</button></Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                <Button onClick={AddTransportClick} className='m-3' variant="primary" type="submit">
                Add Transport
                </Button>
            </div>
        </Modal>
        
    )
}
