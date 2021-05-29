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
import AbilitaSelector from "./AbilitySelector";
import ClassDetails from "./ClassDetails";
import AbilitaDetails from "./AbilitaDetails";

export default function AbilitaPanel({abilita, setAbilita}) {
    const exporter = {abilita, setAbilita}
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Abilita
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <div className={Style.GeneralitaPanel}>
                    <AbilitaSelector {...exporter} />
                    {abilita.map(c => <AbilitaDetails abilita={c} setAbilita={setAbilita} listaAbilita={abilita}/>)}
                </div>

            </Accordion.Collapse>
        </Card>)
}