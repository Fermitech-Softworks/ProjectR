import React, {useEffect, useState} from "react";
import Style from "../CharacterEntry.module.css";
import {Button, ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form"
import {useAppContext} from "../../libs/Context";

export default function PlayerEntry(props) {
    const [selected, setSelected] = useState(false)
    const {uid} = useAppContext()

    function onLoad() {
        if (props.group.users.includes(props.player)) {
            setSelected(true)
        }
    }

    useEffect(() => {
        onLoad()
    }, [props.group])

    function update(event) {
        let value = event.target.checked
        if (props.player.utente !== uid) {
            props.setGroups(group => {
                    group = group.map(function (entry) {
                        if (typeof entry !== 'undefined') {
                            if (entry.nome === props.group.nome) {
                                if (value) {
                                    if (!entry.users.includes(props.player)) {
                                        entry.users.push(props.player)
                                        setSelected(true)
                                    }
                                } else {
                                    let array = []
                                    entry.users.forEach(function (entry) {
                                        if (entry != undefined) {
                                            if (entry.utente === props.player.utente) {

                                            } else {
                                                array.push(entry)
                                            }
                                        }
                                    })
                                    entry.users = array
                                    setSelected(false)
                                }
                            }
                            return entry
                        }
                    })
                    return group
                }
            )
        }
    }

    if (props.player !== undefined) {
        return (
            <div className={Style.CharacterEntry}>
                <ListGroup.Item><Row>
                    <Col>Username: {props.player.username}</Col>
                    <Col>
                        <div className={Style.Options}>
                            <Form.Check type="checkbox" checked={selected} label="Membro?"
                                        onClick={event => update(event)}/>
                        </div>
                    </Col>
                </Row></ListGroup.Item>

            </div>
        );
    }
    return (<div></div>)
}