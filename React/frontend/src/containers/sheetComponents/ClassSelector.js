import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {Jumbotron} from "react-bootstrap";
import Style from "./SpecieSelector.module.css";
import Form from "react-bootstrap/Form";
import Input from "reactstrap";
import {useAppContext} from "../../libs/Context";
import CharacterEntry from "../CharacterEntry";

export default function ClassSelector({classe, setClasse}) {

    const [classList, setClassList] = useState([])
    const [descrizione, setDescrizione] = useState("")
    const {userToken} = useAppContext()
    const {address} = useAppContext()

    useEffect(() => {
        onLoad();
    }, []);


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
        const response = await fetch(address + "/artificier/classes/", {
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
        let classData = values['results']
        classData.sort(compare)
        setClassList(classData)
    }

    function update(event) {
        let value = event.target.value
        console.debug(value)
        if (value < 0) {
            setDescrizione("")
            return
        }
        classList.forEach(function (entry) {
            if (entry.id == value) {
                setDescrizione(entry.dettagli)
            }
        })
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Aggiungi una classe</Form.Label>
                <Form.Control as="select" onChange={event => {update(event)}}>
                    <option value="-1">Scegli una classe...</option>
                    {classList.map(classe => <option value={classe.id}>{classe.nome}</option>)}
                </Form.Control>
            </Form.Group>
            <div className={Style.DescriptionContainer}>
                {descrizione}
            </div>
        </div>
    );
}