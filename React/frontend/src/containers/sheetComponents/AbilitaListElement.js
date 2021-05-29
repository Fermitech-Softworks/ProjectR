import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron, ListGroup} from "react-bootstrap";
import Style from "./GeneralitaPanel.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpecieSelector from "./SpecieSelector";
import React, {useEffect, useState} from "react";
import ClassSelector from "./ClassSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useAppContext} from "../../libs/Context";

export default function AbilitaListElement({abilita, value}) {


    return (
        <div>
            <ListGroup.Item>
                <Row>
                    <Col>{abilita.nome} ({abilita.attributo})</Col>
                    <Col>{value}</Col>
                </Row>
            </ListGroup.Item>
        </div>
    )
}