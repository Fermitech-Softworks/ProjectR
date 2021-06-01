import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron} from "react-bootstrap";
import Style from "./GeneralitaPanel.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpecieSelector from "./SpecieSelector";
import React from "react";
import ClassSelector from "./ClassSelector";

export default function ClasseDetails(props) {

    function setLevel(value) {
        console.debug(value)
        if (value === "") {
            value = "0"
        }
        value = parseInt(value)
        if (value <= -1 || value > 20) {
            return
        }
        console.debug(value)
        props.setClasse(classe => {
                classe = classe.map(function (entry) {
                    if (entry.classe_id === props.classe.classe_id) {
                        console.debug(entry)
                        entry.livello = value
                    }
                    return entry
                })
                return classe
            }
        )
        console.debug(props.listaClassi)
    }

    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey={props.classe.classe_id}>
                    {props.classe.classe.nome} (lv. {props.classe.livello})
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.classe.classe_id}>
                <div className={Style.GeneralitaPanel}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Livello</Form.Label>
                        <Form.Control
                            autoFocus
                            type="number"
                            value={props.classe.livello}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                    </Form.Group>
                    <div className={Style.DescriptionContainer}>
                        {props.classe.classe.dettagli}
                    </div>
                </div>
            </Accordion.Collapse>
        </Card>)
}