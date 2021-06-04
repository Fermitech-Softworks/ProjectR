import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Style from "./Selector.module.css";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import {C} from "react-select/dist/index-4bd03571.esm";

export default function GroupForm({groups, setGroups}) {

    const [nome, setNome] = useState("")
    const {uid} = useAppContext()
    const {username} = useAppContext()

    function addGroup(event) {
        setGroups(groups => [...groups, {
            nome: nome,
            id: null,
            players: [{
                username: username,
                uid: uid
            },]
        }])
    }

    return (
        <div>

            <Form.Group size="lg" controlId="nome">
                <Form.Label>Nome gruppo</Form.Label>
                <Row>
                    <Col>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button block onClick={event => addGroup(event)}>Aggiungi</Button>
                    </Col>
                </Row>
            </Form.Group>

        </div>
    );
}