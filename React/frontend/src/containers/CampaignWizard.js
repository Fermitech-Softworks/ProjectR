import React, {useState} from "react";
import Style from "./Dashboard.module.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap";

export default function CampaignWizard() {
    const [nome, setNome] = useState("");
    const [descrizione, setDescrizione] = useState("")
    const [status, setStatus] = useState(false)
    const {userToken} = useAppContext()


    return (
        <div className="CampaignWizard">
            <Row>
                <Col md={4} sm={12}>
                <Jumbotron>
                    <h3>Le tue avventure</h3>
                </Jumbotron>
                </Col>
                <div hidden={!status}>
                    <Col md={4} sm={12}>
                        Giocatori
                    </Col>
                    <Col md={4} sm={12}>
                        Gruppi
                    </Col>
                </div>
            </Row>
        </div>
    );
}