import React, {useEffect, useState} from "react";
import Style from "../CharacterEntry.module.css";
import {Button, ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form"
export default function PlayerEntry({player, players, setPlayers}) {

    function remove(){
        setPlayers(players => {
                players = players.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.utente === player.utente) {

                        } else {
                            return entry
                        }
                    }
                })
                return players
            }
        )
        if (!players) {
            setPlayers([])
        }
    }

    function update(event){
        let value = event.target.checked
        setPlayers(players => {
                players = players.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.utente === player.utente) {
                            console.log("fuf")
                            entry.comeDm = value
                        }
                        return entry
                    }
                })
                return players
            }
        )
    }

    if(player!==undefined){
    return (
        <div className={Style.CharacterEntry}>
            <ListGroup.Item><Row>
                <Col>Username: {player.username}</Col>
                <Col>
                    <div className={Style.Options}>
                        <Form.Check type="checkbox" value={player.comeDm} label="DM?" onChange={event => update(event)} />
                        <Button variant={"danger"} onClick={event => {remove(event)}}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        </Button>
                    </div>
                </Col>
            </Row></ListGroup.Item>

        </div>
    );}
    return (<div></div>)
}