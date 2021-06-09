import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Style from "./Selector.module.css";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import CharacterWizard from "../CharacterWizard";

export default function CharacterSelector({character, setCharacter, campagna}) {

    const [charList, setCharList] = useState([])
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [id, setId] = useState(0)
    const [selectInput, setSelectInput] = useState([])
    const {uid} = useAppContext()

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() => {
        setSelectInput(charList.map(function (entry) {
            return {label: entry.nome, value: entry.id}
        }))
    }, [charList])


    function compare(a, b) {
        if (a.nome < b.nome) {
            return -1;
        }
        if (a.nome > b.nome) {
            return 1;
        }
        return 0;
    }


    async function onLoad() {
        let token = localStorage.getItem("token")
        console.debug(address)
        const response = await fetch(address + "/artificier/characters/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
        })
        const values = await response.json()
        let charData = values['results']
        charData.sort(compare)
        console.debug(charData)
        setCharList(charData)
    }

    function update(event) {
        let value = event.value
        console.debug(value)
        if (value < 0) {
            setId(0)
            return
        }
        setId(value)
    }

    async function selectCharacter(event) {
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/partecipation/set/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({campaign_id:campagna.id, character_id:id})
        })
        if(response.status===201){
            alert("Il personaggio è stato legato a questa campagna.")
        }
        else{
            alert("Qualcosa è andato storto.")
        }

    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">

                <Form.Label>Seleziona un personaggio</Form.Label>
                <Row>

                    <Col md={8} sm={12}>
                        <Select options={selectInput} name="personaggio" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button block type="submit" disabled={!id} onClick={event=>selectCharacter(event)}>
                            Aggiungi
                        </Button>
                    </Col>
                    <div hidden={!id} className={Style.SheetContainer}>
                        <CharacterWizard id={id}/>
                    </div>
                </Row>
            </Form.Group>
        </div>
    );
}