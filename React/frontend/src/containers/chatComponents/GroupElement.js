import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron, ListGroup} from "react-bootstrap";
import Style from "../CharacterEntry.module.css";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";

export default function GroupElement(props) {

    const {address} = useAppContext()

    function transfer_all(event) {
        console.debug(props)
        props.setDmChannelId({id: props.group.id, type: "standard"})
    }
    function move(event){
        props.setDmChannelId({id: props.group.id, type: "master"})
    }
    async function activate(value) {
        let target = null
        props.setGroups(groups => {
                groups = groups.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.id === props.group.id) {
                            entry.attivo = value
                            updateGroupStatus(entry)
                        }
                    }
                    return entry
                })
                return groups
            }
        )
    }

    async function updateGroupStatus(target){
        console.debug("Aggiornamento...")
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/group/" + target.id + "/", {
            method: "PUT",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body:JSON.stringify(target)

        })
        let res = await response.json()
        console.debug(res)
    }

    if (props.group !== undefined) {
        return (
            <div className={Style.CharacterEntry}>
                <ListGroup.Item><Row>
                    <Col>{props.group.nome}</Col>
                    <Col>
                        <div className={Style.Options}>
                            <Form.Check type="checkbox" checked={props.group.attivo} label="Gruppo attivo?"
                                        onClick={event => activate(event.target.checked)}/>
                            <Button variant={"primary"} onClick={event => {
                                move(event)
                            }}>
                                Spostati
                            </Button>
                            <Button variant={"info"} onClick={event => {
                                transfer_all(event)
                            }}>
                                Sposta
                            </Button>
                        </div>
                    </Col>
                </Row></ListGroup.Item>

            </div>)
    } else return (<div></div>)
}