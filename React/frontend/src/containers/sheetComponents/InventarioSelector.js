import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Style from "./SpecieSelector.module.css";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import Button from "react-bootstrap/Button";
import Select from "react-select";

export default function ClassSelector({inventario, setInventario}) {

    const [oggettiList, setOggettiList] = useState([])
    const [descrizione, setDescrizione] = useState("")
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [oggettoId, setOggettoId] = useState(0)
    const [selectInput, setSelectInput] = useState([])

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() =>{
        setSelectInput(oggettiList.map(function(entry){
            return {label: entry.nome, value:entry.id}
        }))
    }, [oggettiList])


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
        const response = await fetch(address + "/artificier/objects/", {
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
        let oggettoData = values['results']
        oggettoData.sort(compare)
        setOggettiList(oggettoData)
    }

    function update(event) {
        let value = event.value
        if (value < 0) {
            setDescrizione("")
            return
        }
        setOggettoId(value)
        oggettiList.forEach(function (entry) {
            if (entry.id == value) {
                setDescrizione(entry.dettagli + " Costo: "+entry.costo+".")
            }
        })
    }

    function addOggetto(event){
        let present = false;
        inventario.forEach(function (entry){
            if(typeof entry != "undefined"){
            if(oggettoId == entry.oggetto_id){
                present = true;
            }}
        })
        if(!present){
            oggettiList.forEach(function (entry) {
                if(typeof entry != "undefined"){
                if (entry.id == oggettoId) {
                    setInventario(inventario => [...inventario, {
                        quantita: 1,
                        oggetto_id: oggettoId,
                        id: null,
                        oggetto:{
                            nome: entry.nome,
                            dettagli: entry.dettagli,
                            costo: entry.costo
                        }
                    }])

                }}
            })
        }
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">

                <Form.Label>Aggiungi un oggetto</Form.Label>
                <Row>

                    <Col md={8} sm={12}>
                        <Select options={selectInput} name="oggetti" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button block type="submit" disabled={!descrizione} onClick={event => {addOggetto(event)}}>
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