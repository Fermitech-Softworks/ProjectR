import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import React from "react";
import AbilitaSelector from "./AbilitaSelector";
import AbilitaDetails from "./AbilitaDetails";

export default function AbilitaPanel({abilita, setAbilita}) {
    const exporter = {abilita, setAbilita}
    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey="2">
                    Abilita
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
                <div className={Style.GeneralitaPanel}>
                    <AbilitaSelector {...exporter} />
                    {abilita.map(c => <AbilitaDetails abilita={c} setAbilita={setAbilita} listaAbilita={abilita}/>)}
                </div>

            </Accordion.Collapse>
        </Card>)
}