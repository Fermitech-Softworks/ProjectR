import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron, ListGroup} from "react-bootstrap";
import Style from "./GeneralitaPanel.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpecieSelector from "./SpecieSelector";
import React from "react";
import ClassSelector from "./ClassSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";


export default function AbilitaDetails(props) {

    function update(event){
        let value = parseInt(event.target.value)
        if(value === 0){
            props.setIncantesimi(incantesimi => {
                    incantesimi = incantesimi.map(function (entry) {
                        if(typeof entry !== 'undefined'){
                        if (entry.incantesimo_id === props.incantesimo.incantesimo_id) {

                        }
                        else{
                            return entry
                        }}
                    })
                    return incantesimi
                }
            )
            if(!props.incantesimi){
                props.incantesimi([])
            }
        }
        else{
            props.setIncantesimi(incantesimi => {
                    incantesimi = incantesimi.map(function (entry) {
                        if(typeof entry !== 'undefined'){
                        if (entry.incantesimo_id === props.incantesimo.incantesimo_id) {
                            entry.prearata = true
                        }
                        return entry;}
                    })
                    return incantesimi
                }
            )
        }

    }
    if(props.incantesimo){
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={props.incantesimo.incantesimo_id}>
                    {props.incantesimo.incantesimo.nome}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.incantesimo.incantesimo_id}>
                <div className={Style.GeneralitaPanel}>
                    <div className={Style.DescriptionContainer}>
                        Scuola: {props.incantesimo.incantesimo.scuola}<br/>
                        Dadi: {props.incantesimo.incantesimo.dadi} <br/>
                        {props.incantesimo.incantesimo.dettagli}
                    </div>
                </div>
            </Accordion.Collapse>
        </Card>)}
    return (
        <div></div>
    )
}