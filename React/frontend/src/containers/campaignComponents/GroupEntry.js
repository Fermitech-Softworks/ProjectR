import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron} from "react-bootstrap";
import Style from "./Panel.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayerPanel from "./PlayerPanel";
import React, {useState} from "react";
import GroupMember from "./GroupMember";

export default function GroupDetails(props) {

    const [players, setPlayers] = useState([])


    return (
        <Card className={Style.CustomCard}>
            <Card.Header>
                <Accordion.Toggle as={Button} className={Style.CustomAccordionHeaderText} variant="link"
                                  eventKey={props.group.nome}>
                    {props.group.nome}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.group.nome}>
                <div>
                    <div className={Style.GeneralitaPanel}>
                        {props.giocatori.map(player => <GroupMember player={player} group={props.group}
                                                                    setGroups={props.setGroups}/>)}
                    </div>
                </div>
            </Accordion.Collapse>
        </Card>)
}