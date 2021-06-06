import React, {useEffect, useState} from "react";
import Style from "../CharacterEntry.module.css";
import {Button, ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form"
import {func} from "prop-types";

export default function PlayerEntry(props) {

    function update(event) {
        let value = event.target.checked
        console.debug(value)
        props.setGroups(group => {
                group = group.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.nome === props.group.nome) {
                            if (value) {
                                if(!entry.players.includes(props.player)){
                                    entry.players.push(props.player)
                                    console.debug(props.player)
                                }
                            } else {
                                let array = []
                                entry.players.forEach(function (entry) {
                                    if (entry != undefined) {
                                        if (entry.utente === props.player.utente) {

                                        } else {
                                            array.push(entry)
                                        }
                                    }
                                })
                                console.debug(array)
                                entry.players = array
                            }
                        }
                        return entry
                    }
                })
                return group
            }
        )
    }

    if (props.player !== undefined) {
        return (
            <div className={Style.CharacterEntry}>
                <ListGroup.Item><Row>
                    <Col>Username: {props.player.username}</Col>
                    <Col>
                        <div className={Style.Options}>
                            <Form.Check type="checkbox" value="false" label="Membro?"
                                        onClick={event => update(event)}/>
                        </div>
                    </Col>
                </Row></ListGroup.Item>

            </div>
        );
    }
    return (<div></div>)
}