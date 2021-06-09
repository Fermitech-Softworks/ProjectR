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
    const [dmChannelId, setDmChannelId] = useState(null)
    const [autoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        if (channelId === null) {
            return
        }
        let userChannels = []
        groups.forEach(function(entry){
            console.debug(entry)
            console.debug(uid)
            let uids = []
            entry.users.forEach(function(entry){
                uids.push(entry)
            })
            if(uids.includes(uid)){
                userChannels.push(entry.id)
            }
        })
        if(!(userChannels.includes(channelId['id']))){
            console.debug(userChannels)
            console.debug(chatSocket)
            return
        }
        console.debug("Stabilisco la connessione con il canale " + channelId['id'] + " con modalità " + channelId['type'])
        if (!(isDm && channelId['master']) && channelId) {
            console.debug(channelId)
            if (chatSocket !== null) {
                chatSocket.close()
            }
            let s = new WebSocket("ws://localhost:8000/ws/chat/" + channelId['id'] + "/")
            s.onmessage = function (e) {
                if (e.data !== undefined) {
                    let json = JSON.parse(e.data)
                    console.debug(json)
                    if (json['room_name'] === undefined || json['room_name'] === null) {
                        return
                    }
                    setMessageLog(messageLog => [...messageLog, {
                        message: json['message'],
                        mittente: json['mittente'],
                        room_name: json['room_name']
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
            setChannelId({id: data['gruppo'], type: "standard"})
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

    useEffect(() => {
        console.debug("test")
        console.debug(dmChannelId)
        if (dmChannelId !== null && dmChannelId['type'] !== "master" && isDm) {
            console.debug("not master")
            if (campaignSocket !== null) {
                campaignSocket.send(JSON.stringify({
                    'gruppo': dmChannelId['id']
                }))
            }
            if (chatSocket !== null) {
                chatSocket.close()
            }
            setChannelId(dmChannelId)
        } else if (dmChannelId !== null) {
            if (chatSocket !== null) {
                chatSocket.close()
            }
            console.debug("Collegamento al canale " + dmChannelId['id'] + "come master.")
            let s = new WebSocket("ws://localhost:8000/ws/chat/" + dmChannelId['id'] + "/")
            s.onmessage = function (e) {
                if (e.data !== undefined) {
                    let json = JSON.parse(e.data)
                    console.debug(json)
                    setMessageLog(messageLog => [...messageLog, {
                        message: json['message'],
                        mittente: json['mittente'],
                        room_name: json['room_name']
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
        }
    }, [dmChannelId])

    function sendMessage(event) {
        if (chatSocket !== null) {
            console.debug("Invio...")
            chatSocket.send(JSON.stringify({
                'message': message
            }))
        } else {
            alert("Nessun canale è stato attivato, oppure il canale è in pausa. Attendi.")
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
        values.gruppi.forEach(function(entry){
            if(entry.attivo){
                console.debug(entry)
                if(entry.users.includes(uid)){
                    if(!isDm){
                    setChannelId({id:entry.id, type:"standard"})}
                    else{
                        setDmChannelId({id:entry.id, type:"standard"})
                    }
                }
            }
        })
    }



    const exporter_groups = {groups, setGroups, dmChannelId, setDmChannelId}
    const exporter_chatlog = {messageLog, listaPlayer, autoScroll}

    return (
        <div className={Style.Wizard}>
            <Row>
                <Col md={6} sm={12}>
                    <ChatLog {...exporter_chatlog}/>
                    <Form.Group size="lg" controlId="nome">
                        <Form.Control
                            autoFocus
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                        <Button block onClick={event => sendMessage(event)} disabled={!channelId}>Invia</Button>
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" checked={autoScroll} label="Autoscroll?"
                                        onClick={event => setAutoScroll(event.target.checked)}/>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} sm={12}>
                    {isDm ? (
                        <Jumbotron>
                            <h3>Gestione canali</h3>
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