import React, {useEffect, useState} from "react";
import Style from "./CharacterWizard.module.css";
import CampaignList from "./CampaignList";
import CharacterList from "./CharacterList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {useAppContext} from "../libs/Context";
import {Jumbotron} from "react-bootstrap";
import StatValue from "./sheetComponents/StatValue";
import SpecieSelector from "./sheetComponents/SpecieSelector";
import {useHistory, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import GeneralitaPanel from "./sheetComponents/GeneralitaPanel";
import ClassPanel from "./sheetComponents/ClassPanel";
import AbilitaPanel from "./sheetComponents/AbilitaPanel";
import IncantesimiPanel from "./sheetComponents/IncantesimiPanel";
import InventarioPanel from "./sheetComponents/InventarioPanel";
import AbilitaList from "./sheetComponents/AbilitaList";

export default function ChatRoom() {
    const {username} = useAppContext()
    const {uid} = useAppContext()
    let history = useHistory()
    const {address} = useAppContext()
    const {id} = useParams();
    const [message, setMessage] = useState("")
    const [messageLog, setMessageLog] = useState([])
    const token = localStorage.getItem("token")
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        let s = new WebSocket("ws://localhost:8000/ws/chat/" + id + "/", ["access_token", token])
        s.onmessage = function (e) {
            const data = JSON.parse(e.data)
            console.log("MESSAGGIO: " + e.data)
        }
        s.onerror = function (e) {
            console.debug(e)
        }
        s.onclose = function (e) {
            console.debug(e)
        }
        setSocket(s)
        return () => {
            if (socket !== null) {
                socket.close()
            }
            setSocket(null)
        }
    }, [id])


    function sendMessage(event) {
        socket.send(JSON.stringify({
            'message': message
        }))
    }

    return (
        <div className={Style.Wizard}>
            <Form.Group size="lg" controlId="nome">
                <Form.Label>Messaggio</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button block onClick={event => sendMessage(event)}>Invia</Button>
        </div>
    );
}