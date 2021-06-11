import React, {useEffect, useState} from "react";
import Style from "./Selector.module.css";
import CharacterWizard from "../CharacterWizard";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import {useAppContext} from "../../libs/Context";

export default function PlayerCharacters({campagna}) {

    const [charList, setCharList] = useState([])
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [id, setId] = useState(0)
    const [selectInput, setSelectInput] = useState([])
    const {uid} = useAppContext()

    useEffect(() => {
        setCharList(campagna.personaggi)
    }, []);

    useEffect(() => {
        setSelectInput(charList.map(function (entry) {
            return {label: entry.nome, value: entry.id}
        }))
    }, [charList])

    function update(event) {
        let value = event.value
        if (value < 0) {
            setId(0)
            return
        }
        setId(value)
    }

    return (
        <div style={{marginBottom: '3vh'}}>
            <Form.Group controlId="formSelect">

                <Form.Label>Seleziona un personaggio</Form.Label>
                <Row>

                    <Col>
                        <Select options={selectInput} name="personaggio" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <div hidden={!id} className={Style.SheetContainer}>
                        <CharacterWizard id={id}/>
                    </div>
                </Row>
            </Form.Group>
        </div>
    );
}