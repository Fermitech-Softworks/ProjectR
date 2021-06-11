import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import Form from "react-bootstrap/Form";
import React from "react";

export default function ClasseDetails(props) {

    function setLevel(value) {
        if (value === "") {
            value = "1"
        }
        value = parseInt(value)
        if (value <= -1 || value > 20) {
            return
        }
        props.setClasse(classe => {
                classe = classe.map(function (entry) {
                    if (entry !== undefined) {
                        if (entry.classe_id === props.classe.classe_id) {
                            entry.livello = value
                        }
                        if (value != 0) {
                            return entry
                        }
                    }
                })
                return classe
            }
        )
    }

    if(props.classe){
    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link"
                                  eventKey={props.classe.classe_id}>
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
        </Card>)}
    else return(<div></div>)
}