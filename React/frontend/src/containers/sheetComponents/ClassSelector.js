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

export default function ClassSelector({classe, setClasse}) {

    const [classList, setClassList] = useState([])
    const [descrizione, setDescrizione] = useState("")
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [classeId, setClasseId] = useState(0)
    const [selectInput, setSelectInput] = useState([])

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() =>{
        setSelectInput(classList.map(function(entry){
            return {label: entry.nome, value:entry.id}
        }))
    }, [classList])


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
        let value = event.value
        console.debug(value)
        if (value < 0) {
            setDescrizione("")
            return
        }
        setClasseId(value)
        classList.forEach(function (entry) {
            if (entry.id == value) {
                setDescrizione(entry.dettagli)
            }
        })
    }

    function addClass(event){
        let present = false;
        classe.forEach(function (entry){
            if(classeId == entry.classe_id){
                present = true;
            }
        })
        if(!present){
            classList.forEach(function (entry) {
                if (entry.id == classeId) {
                    setClasse(classe => [...classe, {
                        livello: 1,
                        id: null,
                        classe_id: classeId,
                        classe:{
                            nome: entry.nome,
                            dettagli: entry.dettagli
                        }
                    }])

                }
            })
        }
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">

                        <Form.Label>Aggiungi una classe</Form.Label>
                <Row>

                    <Col md={8} sm={12}>
                        <Select  options={selectInput} name="incantesimi" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button block type="submit" disabled={!descrizione} onClick={event => {addClass(event)}}>
                            Aggiungi
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
            <div className={Style.DescriptionContainer} hidden={!descrizione}>
                {descrizione}
            </div>
        </div>
    );
}