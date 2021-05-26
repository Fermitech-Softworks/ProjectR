import React, {useEffect, useState} from "react";
import Style from "./CharacterEntry.module.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
export default function CharacterEntry({nome, livello,...props}) {

    return (
        <div className={Style.CharacterEntry}>
                    <ListGroup.Item><Row>
                        <Col>{nome}, livello {livello}</Col>
                        <Col>
                            <div className={Style.Options}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                                &nbsp;
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </div>
                        </Col>
                    </Row></ListGroup.Item>

        </div>
    );
}