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

export default function GroupElement(props) {

    function activate(event) {
        props.setChannelId({id: props.group.id, type: "standard"})
    }
    function move(event){
        props.setChannelId({id: props.group.id, type: "master"})
    }

    if (props.group !== undefined) {
        return (
            <div className={Style.CharacterEntry}>
                <ListGroup.Item><Row>
                    <Col>{props.group.nome}</Col>
                    <Col>
                        <div className={Style.Options}>
                            <Button variant={"primary"} onClick={event => {
                                move(event)
                            }}>
                                Spostati
                            </Button>
                            <Button variant={"info"} onClick={event => {
                                activate(event)
                            }}>
                                Sposta
                            </Button>
                        </div>
                    </Col>
                </Row></ListGroup.Item>

            </div>)
    } else return (<div></div>)
}