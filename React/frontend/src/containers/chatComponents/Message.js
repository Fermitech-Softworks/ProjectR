import Button from "react-bootstrap/Button";
import {Jumbotron, ListGroup} from "react-bootstrap";
import Style from "../CharacterEntry.module.css";
import React, {useEffect, useRef, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useAppContext} from "../../libs/Context";

export default function Message(props) {

    const [user, setUser] = useState("")
    const {uid} = useAppContext()
    const [isSelf, setIsSelf] = useState(false)
    const [hasImage, setHasImage] = useState(false)
    const [imageAddress, setImageAddress] = useState("")
    const [inResponse, setInResponse] = useState(false)
    const ref = useRef(null)
    const {address} = useAppContext()

    const scroll = () => ref.current.scrollIntoView()

    function getUser() {
        props.listaPlayer.forEach(function (entry) {
            if (entry.utente.id === props.message.utente) {
                setUser(entry.utente)
                if (uid === entry.utente.id) {
                    setIsSelf(true)
                }
            }
        })
    }

    useEffect(() => {
        getUser()
        if (props.autoScroll) {
            scroll()
        }
        if (props.message.immagine!==null){
            setHasImage(true)
            setImageAddress(address+props.message.immagine)
        }
        if (props.message.in_risposta){
            console.debug(props.message)
            setInResponse(true)
        }
    }, [])

    return (
        <div className={Style.CharacterEntry} ref={ref}>
            <Row>
                <Col md={6} sm={12}>
                    {!isSelf ? (

                        <ListGroup.Item>
                            <Row>
                                <b>
                                    {user.username} (#{props.message.gruppo})
                                </b>
                            </Row>
                            <Row>
                                {inResponse ? (<div>R:[{props.message.in_risposta.contenuto}]&nbsp;</div>):(<div></div>)}
                                {props.message.contenuto}
                                {hasImage ? (<div>&nbsp;<a href={imageAddress} target="_blank">Link</a></div>) : ( <div></div> )}
                            </Row>
                        </ListGroup.Item>

                    ) : (
                        <div><Button variant={"light"} onClick={event => props.setReplyId(props.message.id)}>Rispondi</Button></div>
                    )}
                </Col>
                <Col md={6} sm={12}>
                    {isSelf ? (

                        <ListGroup.Item>
                            <Row>
                                <b>
                                    {user.username} (#{props.message.gruppo})
                                </b>
                            </Row>
                            <Row>
                                {inResponse ? (<div>R:[{props.message.in_risposta.contenuto}]&nbsp;</div>):(<div></div>)}
                                {props.message.contenuto}
                                {hasImage ? (<div>&nbsp;<a href={imageAddress} target="_blank">Link</a></div>) : ( <div></div> )}
                            </Row>
                        </ListGroup.Item>

                    ) : (
                        <div><Button variant={"light"} onClick={event => props.setReplyId(props.message.id)}>Rispondi</Button></div>
                    )}
                </Col>
            </Row>
        </div>)
}