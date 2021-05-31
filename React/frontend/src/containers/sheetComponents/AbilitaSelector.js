import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {Jumbotron} from "react-bootstrap";
import Style from "./SpecieSelector.module.css";
import Form from "react-bootstrap/Form";
import Input from "reactstrap";
import {useAppContext} from "../../libs/Context";
import CharacterEntry from "../CharacterEntry";
import Button from "react-bootstrap/Button";
import Select from "react-select";

export default function AbilitaSelector({abilita, setAbilita}) {

    const [abilitaList, setAbilitaList] = useState([])
    const [descrizione, setDescrizione] = useState("")
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [abilitaId, setAbilitaId] = useState(0)
    const [grado, setGrado] = useState(2)
    const [selectInput, setSelectInput] = useState([])

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() =>{
        setSelectInput(abilitaList.map(function(entry){
            return {label: entry.nome, value:entry.id}
        }))
    }, [abilitaList])


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
        const response = await fetch(address + "/artificier/abilities/", {
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
        let abilitaData = values['results']
        abilitaData.sort(compare)
        setAbilitaList(abilitaData)
    }

    function update(event) {
        let value = event.value
        console.debug(value)
        if (value < 0) {
            setDescrizione("")
            return
        }
        setAbilitaId(value)
        abilitaList.forEach(function (entry) {
            if (entry.id == value) {
                setDescrizione(entry.descrizione+" Caratteristica: "+entry.attributo)
            }
        })
    }

    function addAbilita(event){
        let present = false;
        console.debug(abilita)
        console.debug(typeof abilita[0])

        abilita.forEach(function (entry){
            if(typeof entry !== 'undefined'){
            if(abilitaId == entry.abilita_id){
                present = true;
            }}
        })
        if(!present){
            abilitaList.forEach(function (entry) {
                if (entry.id == abilitaId) {
                    setAbilita(abilita => [...abilita, {
                        grado: grado,
                        abilita_id: abilitaId,
                        abilita:{
                            nome: entry.nome,
                            dettagli: entry.descrizione,
                            attributo: entry.attributo
                        }
                    }])

                }
            })
        }
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Aggiungi un'abilità in cui il personaggio ha esperienza.</Form.Label>
                <Row>

                    <Col md={4} sm={12}>
                        <Select  options={selectInput} name="abilita" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <Col md={4} sm={12}>
                        <Form.Control as="select" onChange={event => {setGrado(parseInt(event.target.value))}} value={grado}>
                            <option value="1">Mezza proficiency</option>
                            <option value="2">Proficiency</option>
                            <option value="3">Expertise</option>
                        </Form.Control>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button block type="submit" disabled={!descrizione} onClick={event => {addAbilita(event)}}>
                            Aggiungi
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
            <div className={Style.DescriptionContainerShort} hidden={!descrizione}>
                {descrizione}
            </div>
        </div>
    );
}