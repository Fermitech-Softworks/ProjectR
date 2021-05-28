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
import ClassDetails from "./ClassDetails";

export default function ClassePanel({classe, setClasse}) {
    const exporter = {classe, setClasse}
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Classi
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <div className={Style.GeneralitaPanel}>
                    <ClassSelector {...exporter}/>
                    <div>
                        <Accordion>
                            {classe.map(c => <ClassDetails classe={c} setClasse={setClasse} listaClassi={classe}/>)}
                        </Accordion>
                    </div>
                </div>
            </Accordion.Collapse>
        </Card>)
}