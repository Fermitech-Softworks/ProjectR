import {Jumbotron, ListGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

export default function AbilitaDetails(props) {

    function update(event){
        let value = parseInt(event.target.value)
        if(value === 0){
            props.setAbilita(abilita => {
                    abilita = abilita.map(function (entry) {
                        if(typeof entry !== 'undefined'){
                        if (entry.abilita_id === props.abilita.abilita_id) {

                        }
                        else{
                            return entry
                        }}
                    })
                    return abilita
                }
            )
            if(!props.abilita){
                props.setAbilita(abilita => [])
            }
        }
        else{
            props.setAbilita(abilita => {
                    abilita = abilita.map(function (entry) {
                        if(typeof entry !== 'undefined'){
                        if (entry.abilita_id === props.abilita.abilita_id) {
                            entry.grado = value
                        }
                        return entry;}
                    })
                    return abilita
                }
            )
        }

    }
    if(props.abilita){
    return (
        <div>
            <ListGroup.Item><Row>
                <Col>{props.abilita.abilita.nome}</Col>
                <Col>
                    <Form.Control as="select" value={props.abilita.grado} onChange={event => {update(event)}}>
                        <option value="1">Mezza proficiency</option>
                        <option value="2">Proficiency</option>
                        <option value="3">Expertise</option>
                        <option value="0">Rimuovi</option>
                    </Form.Control>
                </Col>
            </Row></ListGroup.Item>

        </div>)}
    return (
        <div></div>
    )
}