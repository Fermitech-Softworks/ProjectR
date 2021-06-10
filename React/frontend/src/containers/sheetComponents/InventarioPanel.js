import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./GeneralitaPanel.module.css";
import React from "react";
import InventarioSelector from "./InventarioSelector";
import InventarioDetails from "./InventarioDetails";

export default function ClassePanel({inventario, setInventario}) {
    const exporter = {inventario, setInventario}
    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link" eventKey="4">
                    Inventario
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
                    <div className={Style.GeneralitaPanel}>
                        <InventarioSelector {...exporter} />
                        <Accordion>
                            {inventario.map(oggetto => <InventarioDetails oggetto={oggetto}
                                                                                setInventario={setInventario}
                                                                                inventario={inventario}/>)}
                        </Accordion>
                    </div>
            </Accordion.Collapse>
        </Card>)
}