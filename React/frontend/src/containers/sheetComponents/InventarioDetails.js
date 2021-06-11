import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import Form from "react-bootstrap/Form";
import React from "react";

export default function InventarioDetails(props) {

    function setQuantity(value) {
        if (value === "") {
            value = "1"
        }
        value = parseInt(value)
        if (value === 0) {
            props.setInventario(inventario => {
                    inventario = inventario.map(function (entry) {
                        if(typeof entry != "undefined"){
                        if (entry.oggetto_id === props.oggetto.oggetto_id) {

                        } else {
                            return entry
                        }}
                    })
                    return inventario
                }
            )
            if (!props.inventario) {
                props.setInventario([])
            }
        } else {
            props.setInventario(inventario => {
                    inventario = inventario.map(function (entry) {
                        if(typeof entry != "undefined"){
                        if (entry.oggetto_id === props.oggetto.oggetto_id) {
                            entry.quantita = value
                        }
                        return entry}
                    })
                    return inventario
                }
            )
        }
    }

    if (props.oggetto)
        return (
            <Card className={Style.CustomCard}>
                <Card.Header>
                    <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey={props.oggetto.oggetto_id}>
                        {props.oggetto.oggetto.nome}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.oggetto.oggetto_id}>
                    <div className={Style.GeneralitaPanel}>
                        <Form.Group size="lg" controlId="quantita">
                            <Form.Label>Quantità</Form.Label>
                            <Form.Control
                                autoFocus
                                type="number"
                                value={props.oggetto.quantita}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>
                        <div className={Style.DescriptionContainer}>
                            {props.oggetto.oggetto.dettagli}
                        </div>
                    </div>
                </Accordion.Collapse>
            </Card>)
    else return (<div></div>)
}