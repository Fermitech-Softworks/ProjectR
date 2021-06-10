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
import CharacterSelector from "./chatComponents/CharacterSelector";
import AccordionBody from "react-bootstrap/Accordion";
import PlayerCharacters from "./chatComponents/PlayerCharacters";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

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
    const [character, setCharacter] = useState(true)
    const [userGroups, setUserGroups] = useState([])
    const [replyId, setReplyId] = useState(null)
    const [socketAddress, setSocketAddress] = useState("")
    const addr = address.substring(7)
    const link = "/campaign/details/" + id + "/"
    useEffect(() => {
        if (channelId === null) {
            return
        }
        let userChannels = []
        groups.forEach(function (entry) {
            console.debug(entry)
            console.debug(uid)
            let uids = []
            entry.users.forEach(function (entry) {
                uids.push(entry)
            })
            if (uids.includes(uid)) {
                userChannels.push(entry.id)
            }
        })
        if (!(userChannels.includes(channelId['id']))) {
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
            let s = new WebSocket("ws://" + addr + "/ws/chat/" + channelId['id'] + "/")
            s.onmessage = function (e) {
                if (e.data !== undefined) {
                    let json = JSON.parse(e.data)
                    console.debug(json)
                    if (json['room_name'] === undefined || json['room_name'] === null) {
                        return
                    }
                    setMessageLog(messageLog => [...messageLog, {
                        contenuto: json['message'],
                        utente: json['mittente'],
                        gruppo: json['room_name'],
                        immagine: json['immagine'],
                        id: json['id'],
                        in_risposta: json['messaggioRisposta']
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
        let s = new WebSocket("ws://" + addr + "/ws/campaign/" + id + "/")
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
        console.debug(replyId)
    }, [replyId])

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
            let s = new WebSocket("ws://" + addr + "/ws/chat/" + dmChannelId['id'] + "/")
            s.onmessage = function (e) {
                if (e.data !== undefined) {
                    let json = JSON.parse(e.data)
                    console.debug(json)
                    setMessageLog(messageLog => [...messageLog, {
                        contenuto: json['message'],
                        utente: json['mittente'],
                        gruppo: json['room_name'],
                        immagine: json['immagine'],
                        id: json['id'],
                        in_risposta: json['messaggioRisposta']
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
                'message': message,
                'image': '',
                'responseMessage': replyId
            }))
        } else {
            alert("Nessun canale è stato attivato, oppure il canale è in pausa. Attendi.")
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    async function sendFile(event) {

        if (chatSocket !== null) {
            console.debug("Invio...")
            console.debug(event.target.files)
            let b64file = await toBase64(event.target.files[0])
            if (b64file instanceof Error) {
                alert("Il file potrebbe essere in un formato incompatibile.")
            } else {
                chatSocket.send(JSON.stringify({
                    'message': "Immagine",
                    'image': b64file,
                    'responseMessage': replyId
                }))
            }
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
        if(response.status!== 200){
            alert("Qualcosa è andato storto.")
            history.push("/dashboard")
            return
        }
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
        values.gruppi.forEach(function (entry) {
            if (entry.attivo) {
                console.debug(entry)
                if (entry.users.includes(uid)) {
                    if (!isDm) {
                        setChannelId({id: entry.id, type: "standard"})
                    } else {
                        setDmChannelId({id: entry.id, type: "standard"})
                    }
                }
            }
        })
        let userChannels = []
        values.gruppi.forEach(function (entry) {
            console.debug(entry)
            console.debug(uid)
            let uids = []
            entry.users.forEach(function (entry) {
                uids.push(entry)
            })
            if (uids.includes(uid)) {
                userChannels.push(entry.id)
            }
        })
        console.debug(userChannels)
        setUserGroups(userChannels)


        setSocketAddress(addr)
    }


    const exporter_groups = {groups, setGroups, dmChannelId, setDmChannelId}
    const exporter_chatlog = {messageLog, listaPlayer, autoScroll, setMessageLog, userGroups, setReplyId}
    const exporter_character = {character, setCharacter, campagna}
    const exporter_characters = {campagna, setCampagna}

    return (
        <div className={Style.Wizard}>
            <Row>
                <Col md={5} sm={12}>

                    <ChatLog {...exporter_chatlog}/>
                    {replyId ? (
                        <div> In risposta ad un messaggio... <a href="#" onClick={event => setReplyId(null)}>Annulla</a>
                        </div>) : (<div></div>)}
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
                        <Col>
                            <input type="file" onChange={event => sendFile(event)} disabled={!channelId}/>
                        </Col>
                    </Row>
                </Col>
                <Col md={7} sm={12}>
                    {isDm ? (
                        <div>
                            <Link to={link}>
                                <FontAwesomeIcon icon={faPencilAlt}/> Modifica la campagna
                            </Link>
                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Gruppi
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <AccordionBody>
                                            <GroupPanel {...exporter_groups}/>
                                        </AccordionBody>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            Personaggi dei giocatori
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body><PlayerCharacters {...exporter_characters}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    ) : (
                        <div>
                            <CharacterSelector {...exporter_character}/>
                        </div>
                    )}
                </Col>
            </Row>

        </div>
    );
}