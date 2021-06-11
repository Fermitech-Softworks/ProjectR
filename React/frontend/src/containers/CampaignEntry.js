import React, {useEffect, useState} from "react";
import Style from "./CharacterEntry.module.css";
import {ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
export default function CharacterEntry({titolo, id,...props}) {
    const link2 = "/campaign/chat/"+id+"/"

    useEffect(()=>{
        console.debug(props)
    },[])

    return (
        <div className={Style.CharacterEntry}>
                    <ListGroup.Item><Row>
                        <Col><Link to={link2}>{titolo}</Link></Col>
                    </Row></ListGroup.Item>

        </div>
    );
}