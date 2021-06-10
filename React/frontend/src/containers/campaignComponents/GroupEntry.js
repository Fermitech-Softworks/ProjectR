import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Style from "./Panel.module.css";
import React, {useState} from "react";
import GroupMember from "./GroupMember";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

export default function GroupDetails(props) {

    const [players, setPlayers] = useState([])


    function remove(event) {
        props.setGroups(groups => {
                groups = groups.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        if (entry.nome === props.group.nome) {

                        } else {
                            return entry
                        }
                    }
                })
                return groups
            }
        )
        if (!props.groups) {
            props.setGroups([])
        }
    }

    if (props.group !== undefined) {
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

                        <div className={Style.GeneralitaPanelSmall}>
                            <div className={Style.BottomMargin}>
                                {props.giocatori.map(player => <GroupMember player={player} group={props.group}
                                                                            setGroups={props.setGroups}/>)}
                            </div>
                            <Button variant={"danger"} onClick={event => {
                                remove(event)
                            }}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </Button>
                        </div>

                    </div>
                </Accordion.Collapse>
            </Card>)
    } else return (<div></div>)
}