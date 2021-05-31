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

export default function AbilitaSelector({incantesimi, setIncantesimi}) {

    const [incantesimiList, setIncantesimiList] = useState([])
    const [descrizione, setDescrizione] = useState("")
    const [scuola, setScuola] = useState("")
    const [dadi, setDadi] = useState("")
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [incantesimoId, setIncantesimoId] = useState(0)
    const [preparato, setPreparato] = useState(false)
    const [selectInput, setSelectInput] = useState([])

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() =>{
        setSelectInput(incantesimiList.map(function(entry){
            return {label: entry.nome, value:entry.id}
        }))
    }, [incantesimiList])


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
        const response = await fetch(address + "/artificier/spells/", {
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
        let incantesimiData = values['results']
        incantesimiData.sort(compare)
        setIncantesimiList(incantesimiData)

    }

    function update(event) {
        console.debug(incantesimi)
        let value = event.value
        console.debug(value)
        if (value < 0) {
            setDescrizione("")
            return
        }
        setIncantesimoId(value)
        incantesimiList.forEach(function (entry) {
            if (entry.id == value) {
                setDescrizione(entry.descrizione)
                setDadi(entry.dadi)
                setScuola(entry.scuola)
            }
        })
    }

    function addIncantesimo(event){
        let present = false;
        console.log(incantesimi)
        incantesimi.forEach(function (entry){
            if(typeof entry !== 'undefined'){
            if(incantesimoId == entry.incantesimo_id){
                present = true;
            }}
        })
        if(!present){
            incantesimiList.forEach(function (entry) {
                if (entry.id == incantesimoId) {
                    setIncantesimi(incantesimi => [...incantesimi, {
                        preparata: true,
                        incantesimo_id: incantesimoId,
                        incantesimo:{
                            nome: entry.nome,
                            dettagli: entry.descrizione,
                            scuola: entry.scuola,
                            componenti: entry.componenti,
                            dadi: entry.dadi
                        }
                    }])
                }
            })
            console.log(incantesimi)
        }
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Aggiungi un incantesimo noto al personaggio.</Form.Label>
                <Row>

                    <Col md={8} sm={12}>
                        <Select  options={selectInput} name="incantesimi" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button block type="submit" disabled={!descrizione} onClick={event => {addIncantesimo(event)}}>
                            Aggiungi
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
            <div className={Style.DescriptionContainerShort} hidden={!descrizione}>
                Scuola: {scuola} <br/>
                Dadi: {dadi} <br/>
                {descrizione}
            </div>
        </div>
    );
}