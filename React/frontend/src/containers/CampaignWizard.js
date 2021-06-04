import React, {useState} from "react";
import Style from "./Dashboard.module.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PlayerSelector from "./campaignComponents/PlayerSelector";
import PlayerPanel from "./campaignComponents/PlayerPanel";
import GroupPanel from "./campaignComponents/GroupPanel";

export default function CampaignWizard(props) {
    const [nome, setNome] = useState("");
    const [descrizione, setDescrizione] = useState("")
    const [listaUtenti, setListaUtenti] = useState([])
    const [listaGruppi, setListaGruppi] = useState([])
    const [id, setId] = useState(0)
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [players, setPlayers] = useState([])
    const [groups, setGroups] = useState([])

    const export_players = {players, setPlayers}
    const export_groups = {groups, setGroups}


    function validate_creation(){
        return (nome==="" | descrizione==="")
    }


    async function createCampaign(event) {
        let token = localStorage.getItem("token")
        console.debug("Saving...")
        const response = await fetch(address + "/bard/campaign/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                titolo: nome,
                descrizione: descrizione
            })
        })
        const values = await response.json()
        console.debug(values)
        setId(values['id'])
    }


    return (
        <div className={Style.DashboardLeft}>
            <Row>
                <Col md={4} sm={12}>
                    <Jumbotron>
                        <h3>Informazioni generali</h3>
                        <Form.Group size="lg" controlId="nome">
                            <Form.Label>Nome campagna</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows={5} value={descrizione}
                                          onChange={event => setDescrizione(event.target.value)}/>
                        </Form.Group>
                        <Button onClick={event => createCampaign(event)}>Salva le modifiche</Button>
                    </Jumbotron>
                </Col>
                <Col md={8} sm={12}>
                <Jumbotron>
                    <Row>
                    <Col md={6} sm={12}>
                        <h3> Giocatori </h3>
                        <PlayerPanel {...export_players}/>
                    </Col>
                    <Col md={6} sm={12}>
                        <h3> Gruppi </h3>
                        <GroupPanel {...export_groups}/>
                    </Col>
                    </Row>
                </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}