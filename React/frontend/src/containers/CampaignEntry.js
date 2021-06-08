import React, {useEffect, useState} from "react";
import Style from "./CharacterEntry.module.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
export default function CharacterEntry({titolo, id,...props}) {
    const link = "/campaign/details/"+id+"/"
    const link2 = "/campaign/chat/"+id+"/"

    useEffect(()=>{
        console.log(props)
    },[])

    return (
        <div className={Style.CharacterEntry}>
                    <ListGroup.Item><Row>
                        <Col><Link to={link2}>{titolo}</Link></Col>
                        <Col>
                            <Link to={link}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </Link>
                            &nbsp;
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </Col>
                    </Row></ListGroup.Item>

        </div>
    );
}