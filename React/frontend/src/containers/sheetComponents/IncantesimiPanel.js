import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import React from "react";
import IncantesimiSelector from "./IncantesimiSelector";
import IncantesimiDetails from "./IncantesimiDetails";

export default function ClassePanel({incantesimi, setIncantesimi}) {
    const exporter = {incantesimi, setIncantesimi}
    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey="3">
                    Incantesimi
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
                    <div className={Style.GeneralitaPanel}>
                        <IncantesimiSelector {...exporter} />
                        <Accordion>
                            {incantesimi.map(incantesimo => <IncantesimiDetails incantesimo={incantesimo}
                                                                                setIncantesimi={setIncantesimi}
                                                                                listaIncantesimi={incantesimi}/>)}
                        </Accordion>
                    </div>
            </Accordion.Collapse>
        </Card>)
}