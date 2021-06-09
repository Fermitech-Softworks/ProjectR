import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron, ListGroup} from "react-bootstrap";
import Style from "../CharacterEntry.module.css";
import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import GroupPanel from "./GroupPanel";

export default function Message(props) {

    const [user, setUser] = useState("")
    const {uid} = useAppContext()
    const [isSelf, setIsSelf] = useState(false)
    const ref = useRef(null)

    const scroll = () => ref.current.scrollIntoView()

    function getUser() {
        props.listaPlayer.forEach(function (entry) {
            if (entry.utente.id === props.message.utente) {
                console.debug(entry.utente)
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
                                {props.message.contenuto}
                            </Row>
                        </ListGroup.Item>

                    ) : (
                        <div>&nbsp;</div>
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
                                {props.message.contenuto}
                            </Row>
                        </ListGroup.Item>

                    ) : (
                        <div>&nbsp;</div>
                    )}
                </Col>
            </Row>
        </div>)
}