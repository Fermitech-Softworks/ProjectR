import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import Button from "react-bootstrap/Button";

export default function GroupForm({groups, setGroups}) {

    const [nome, setNome] = useState("")
    const {uid} = useAppContext()
    const {username} = useAppContext()

    function addGroup(event) {
        setGroups(groups => [...groups, {
            nome: nome,
            id: null,
            attivo: false,
            users: [{
                username: username,
                utente: uid
            }]
        }])
    }

    function validator() {
        let check = true
        if (!nome) {
            check = false
        }
        groups.forEach(function (entry) {
            if (entry !== undefined) {
                if (entry.nome === nome) {
                    check = false
                    return
                }
            }
        })
        return check
    }

    return (
        <div>

            <Form.Group size="lg" controlId="nomeGruppo">
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
                        <Button block onClick={event => addGroup(event)} disabled={!validator()}>Aggiungi</Button>
                    </Col>
                </Row>
            </Form.Group>

        </div>
    );
}