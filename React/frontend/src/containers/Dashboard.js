import React from "react";
import Style from "./Dashboard.module.css";
import CampaignList from "./CampaignList";
import CharacterList from "./CharacterList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {useAppContext} from "../libs/Context";
export default function Dashboard() {
    const {username} = useAppContext()
    return (
        <div className={Style.Dashboard}>
            <div className={Style.lander}>
                <h1>Benvenuto sulla tua dashboard, {username}</h1>
                <Row>
                    <Col>
                        <CampaignList/>
                    </Col>
                    <Col>
                        <CharacterList/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}