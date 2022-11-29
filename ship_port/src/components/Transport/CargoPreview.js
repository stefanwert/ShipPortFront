import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useTransition } from "react";
import { useState } from "react";
import { serviceConfig } from "../../settings";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from 'react-redux'
import { updateshowCargoPreview} from './Slice/addTransport'

export default function CargoPreview(props) {
    const [cargos, setCargos] = useState([]);
    const showCargoList = useSelector((state) => state.addTransport.showCargoList);
    const reloadCargoListOnPropChange = useSelector((state) => state.addTransport.reloadCargoListOnPropChange);
    const transportToAdd = useSelector((state) => state.addTransport.transportToAdd);
    const dispatch = useDispatch();
    
    const handleClose = (event) => {
        dispatch(updateshowCargoPreview(false));
    };

    useEffect(() => {
        console.log(props?.cargos);
    }, [props]);
    return (
        <Modal show={true} onHide={handleClose}>
            <div className='grid-container-backgruond ' >
                <h1>CARGO FOR SELECTED ITEM:</h1>
                <div className='grid-container'>
                    {props?.cargos?.map(function(card, idx){
                        return (<Card id={card.id} key ={card.id}  className="cargo-card" style={{ width: '18rem', border: card.isSelected? "5px solid black" : ""}}>
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
                    </Card>)
                    })}
                </div>
            </div>
        </Modal>
        
    )
}
