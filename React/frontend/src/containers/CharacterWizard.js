import React, {useState} from "react";
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
    const [forza, setForza] = useState(10)
    const [destrezza, setDestrezza] = useState(10)
    const [costituzione, setCostituzione] = useState(10)
    const [intelligenza, setIntelligenza] = useState(10)
    const [saggezza, setSaggezza] = useState(10)
    const [carisma, setCarisma] = useState(10)
    return (
        <div className={Style.Wizard}>
            <Row>
                <Col md={5} sm={12}>
                    <Jumbotron>
                        <h5>
                            Generalità
                        </h5>
                    </Jumbotron>
                </Col>
                <Col md={7} sm={12}>
                    <Jumbotron>
                        <h5>Statistiche base</h5>
                        <Row>
                            <Col>
                                <StatValue nome="Forza" value={forza} setValue={setForza}/>
                            </Col>
                            <Col>
                                <StatValue nome="Destrezza" value={destrezza} setValue={setDestrezza}/>
                            </Col>
                            <Col>
                                <StatValue nome="Costituzione" value={costituzione} setValue={setCostituzione}/>
                            </Col>
                            <Col>
                                <StatValue nome="Intelligenza" value={intelligenza} setValue={setIntelligenza}/>
                            </Col>
                            <Col>
                                <StatValue nome="Saggezza" value={saggezza} setValue={setSaggezza}/>
                            </Col>
                            <Col>
                                <StatValue nome="Carisma" value={carisma} setValue={setCarisma}/>
                            </Col>
                        </Row>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}