import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Jumbotron} from "react-bootstrap";
import Style from "./GeneralitaPanel.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpecieSelector from "./SpecieSelector";
import React from "react";

export default function GeneralitaPanel({nome, setNome, pvAttuali, setPvAttuali, pvMax, setPvMax, classeArmatura,
                                      setClasseArmatura, livello, setLivello, proficiency, setProficiency,
                                      specie, setSpecie}) {

    const exporter = {specie, setSpecie}

    return (
        <Accordion defaultActiveKey="0">
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Generalità
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <div className={Style.GeneralitaPanel}>
                    <div className={Style.LeftAlign}>
                        <Form.Group size="lg" controlId="nome">
                            <Form.Label>Nome personaggio</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={4} sm={12}>
                                <Form.Group size="lg" controlId="pvnow">
                                    <Form.Label>PV attuali</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="number"
                                        value={pvAttuali}
                                        onChange={(e) => setPvAttuali(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group size="lg" controlId="pvmax">
                                    <Form.Label>PV massimi</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="number"
                                        value={pvMax}
                                        onChange={(e) => setPvMax(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group size="lg" controlId="classeArmatura">
                                    <Form.Label>Classe armatura</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="number"
                                        value={classeArmatura}
                                        onChange={(e) => setClasseArmatura(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <Form.Group size="lg" controlId="livello">
                                    <Form.Label>Livello</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="number"
                                        value={livello}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group size="lg" controlId="proficiency">
                                    <Form.Label>Proficiency</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="number"
                                        value={proficiency}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <SpecieSelector {...exporter}/>
                    </div>
                </div>
            </Accordion.Collapse>

        </Card></Accordion>)
}