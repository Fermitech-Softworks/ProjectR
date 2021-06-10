import React, {useEffect, useState} from "react";
import Style from "./SpecieSelector.module.css";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";

export default function SpecieSelector({specie, setSpecie}) {

    const [specieList, setSpecieList] = useState([])
    const [descrizione, setDescrizione] = useState("")
    const {userToken} = useAppContext()
    const {address} = useAppContext()

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() => {
        setDescrizione(specie.dettagli)
    }, [specie])


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
        console.log(token)
        const response = await fetch(address + "/artificier/species/", {
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
        let specData = values['results']
        specData.sort(compare)
        setSpecieList(specData)
    }

    function update(event) {
        let value = event.target.value
        console.debug(value)
        if (value < 0) {
            setDescrizione("")
            return
        }
        specieList.forEach(function (entry) {
            if (entry.id == value) {
                setSpecie(entry)
                setDescrizione(entry.dettagli)
            }
        })
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={event => {
                    update(event)
                }}>
                    <option value="-1">Cambia specie...</option>
                    {specieList.map(spec => <option value={spec.id}>{spec.nome}</option>)}
                </Form.Control>
            </Form.Group>
            <div hidden={!descrizione}>
                {specie.nome}
                <div className={Style.DescriptionContainer}>
                    {descrizione}
                </div>
            </div>
        </div>
    );
}