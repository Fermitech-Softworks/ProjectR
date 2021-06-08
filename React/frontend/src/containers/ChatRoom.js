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
import {Link, useHistory, useParams} from "react-router-dom";
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
import Navbar from "react-bootstrap/Navbar";
import GroupPanel from "./chatComponents/GroupPanel";
import ChatLog from "./chatComponents/ChatLog";

export default function ChatRoom() {
    const {username} = useAppContext()
    const {uid} = useAppContext()
    let history = useHistory()
    const {address} = useAppContext()
    const {id} = useParams();
    const [channelId, setChannelId] = useState(null)
    const [message, setMessage] = useState("")
    const [messageLog, setMessageLog] = useState([])
    const token = localStorage.getItem("token")
    const [chatSocket, setChatSocket] = useState(null)
    const [campaignSocket, setCampaignSocket] = useState(null)
    const [isDm, setIsDm] = useState(false)
    const [campagna, setCampagna] = useState(null)
    const [listaPlayer, setListaPlayer] = useState([])
    const [groups, setGroups] = useState([])

    useEffect(() => {
        if (channelId === null) {
            return
        }
        let s = new WebSocket("ws://localhost:8000/ws/chat/" + channelId + "/")
        s.onmessage = function (e) {
            if (e.data !== undefined) {
                let json = JSON.parse(e.data)
                console.debug(json)
                setMessageLog(messageLog => [...messageLog, {
                    message: json['message']
                }
                ])
            }
        }
        s.onerror = function (e) {
            console.debug(e)
        }
        s.onclose = function (e) {
            console.debug(e)
        }
        setChatSocket(s)
        return () => {
            if (chatSocket !== null) {
                chatSocket.close()
            }
            setChatSocket(null)
        }
    }, [channelId])


    useEffect(() => {
        if (id === null) {
            return
        }
        let s = new WebSocket("ws://localhost:8000/ws/campaign/" + id + "/")
        s.onmessage = function (e) {
            const data = JSON.parse(e.data)
            console.log("Gruppo: " + e.data)
            setChannelId(data['gruppo'])
        }
        s.onerror = function (e) {
            console.debug(e)
        }
        s.onclose = function (e) {
            console.debug(e)
        }
        setCampaignSocket(s)
        return () => {
            if (campaignSocket !== null) {
                campaignSocket.close()
            }
            setCampaignSocket(null)
        }
    }, [id])

    useEffect(()=>{
        if(campaignSocket !== null){
            campaignSocket.send(JSON.stringify({
                'gruppo': channelId
            }))
        }
    }, [channelId])

    function sendMessage(event) {
        if (chatSocket !== null) {
            chatSocket.send(JSON.stringify({
                'message': message
            }))
        } else {
            alert("Nessun canale è stato attivato. Attendi.")
        }
    }

    useEffect(() => {
        getCampaignData()
    }, [])

    async function getCampaignData() {
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/campaign/details/" + id + "/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            }
        })
        const values = await response.json()
        setCampagna(values)
        console.log(values)
        values.utenti.forEach(function (entry) {
            console.log(entry)
            console.log(uid)
            if (entry.utente.id === uid && entry.comeDm) {
                setIsDm(true)
            }
        })
        setListaPlayer(values.utenti)
        setGroups(values.gruppi)
    }

    const exporter_groups = {groups, setGroups, channelId, setChannelId}
    const exporter_chatlog = {messageLog}

    return (
        <div className={Style.Wizard}>
            <Row>
                <Col>
                    <ChatLog {...exporter_chatlog}/>
                    <Form.Group size="lg" controlId="nome">
                        <Form.Control
                            autoFocus
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>
                    <Button block onClick={event => sendMessage(event)}>Invia</Button>
                </Col>
                <Col>
                    {isDm ? (
                        <Jumbotron>
                            <GroupPanel {...exporter_groups}/>
                        </Jumbotron>
                    ) : (
                        <p>player</p>
                    )}
                </Col>
            </Row>

        </div>
    );
}