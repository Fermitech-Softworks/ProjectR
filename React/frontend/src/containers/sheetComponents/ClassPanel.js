import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import React from "react";
import ClassSelector from "./ClassSelector";
import ClassDetails from "./ClassDetails";

export default function ClassePanel({classe, setClasse}) {
    const exporter = {classe, setClasse}
    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey="1">
                    Classi
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
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