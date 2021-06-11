import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {useState} from "react";


export default function IncantesimoDetails(props) {

    function update(event) {
        props.setIncantesimi(incantesimi => {
                incantesimi = incantesimi.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.incantesimo_id === props.incantesimo.incantesimo_id) {
                            entry.preparata = !entry.preparata
                        }
                        return entry;
                    }
                })
                return incantesimi
            }
        )
    }

    function delet() {
        props.setIncantesimi(incantesimi => {
                incantesimi = incantesimi.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.incantesimo_id === props.incantesimo.incantesimo_id) {

                        } else {
                            return entry
                        }
                    }
                })
                return incantesimi
            }
        )
        if (!props.incantesimo) {
            props.setIncantesimi([])
        }
    }

    if (props.incantesimo) {
        return (
            <Card className={Style.CustomCard}>
                <Card.Header>
                    <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey={props.incantesimo.incantesimo_id}>
                        {props.incantesimo.incantesimo.nome}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.incantesimo.incantesimo_id}>
                    <div className={Style.GeneralitaPanel}>
                        <div className={Style.DescriptionContainer}>
                            Scuola: {props.incantesimo.incantesimo.scuola}<br/>
                            Dadi: {props.incantesimo.incantesimo.dadi} <br/>
                            Stato: {props.incantesimo.preparata ? (
                            "Preparata"
                        ) : (
                            "Non preparata"
                        )}<br/>
                            {props.incantesimo.incantesimo.dettagli}
                        </div>
                        <Row>
                            <Col>
                                <Button variant="info" block onClick={event => {
                                    update()
                                }}>Prepara/Scorda</Button>
                            </Col>
                            <Col>
                                <Button variant="danger" block onClick={event => {
                                    delet()
                                }}>Rimuovi</Button>
                            </Col>
                        </Row>


                    </div>

                </Accordion.Collapse>
            </Card>)
    }
    return (
        <div></div>
    )
}