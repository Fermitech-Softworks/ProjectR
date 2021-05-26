import React from "react";
import Style from "./CharacterWizard.module.css";
import CampaignList from "./CampaignList";
import CharacterList from "./CharacterList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {useAppContext} from "../libs/Context";
import {Jumbotron} from "react-bootstrap";
import StatValue from "./sheetComponents/StatValue";
import {useHistory} from "react-router-dom";
export default function CharacterWizard() {
    const {username} = useAppContext()
    let history = useHistory()
    return (
        <div className={Style.Wizard}>
            <Jumbotron>
                <h5>Statistiche base</h5>
                <Row>
                    <Col>
                        <StatValue nome="Forza"/>
                    </Col>
                    <Col>
                        <StatValue nome="Destrezza"/>
                    </Col>
                    <Col>
                        <StatValue nome="Costituzione"/>
                    </Col>
                    <Col>
                        <StatValue nome="Intelligenza"/>
                    </Col>
                    <Col>
                        <StatValue nome="Saggezza"/>
                    </Col>
                    <Col>
                        <StatValue nome="Carisma"/>
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    );
}