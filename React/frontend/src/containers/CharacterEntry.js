import React from "react";
import Style from "./CharacterEntry.module.css";
import {ListGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
export default function CharacterEntry({nome, livello, id,...props}) {
    const link = "/character/details/"+id+"/"
    return (
        <div className={Style.CharacterEntry}>
                    <ListGroup.Item><Row>
                        <Col>{nome}, livello {livello}</Col>
                        <Col>
                            <div className={Style.Options}>
                                <Link to={link}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                                </Link>
                            </div>
                        </Col>
                    </Row></ListGroup.Item>

        </div>
    );
}