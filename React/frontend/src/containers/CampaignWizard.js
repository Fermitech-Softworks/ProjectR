import React, {useEffect, useState} from "react";
import Style from "./Dashboard.module.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PlayerPanel from "./campaignComponents/PlayerPanel";
import GroupPanel from "./campaignComponents/GroupPanel";
import {useHistory} from "react-router-dom";

export default function CampaignWizard(props) {
    const [nome, setNome] = useState("");
    const [descrizione, setDescrizione] = useState("")
    const [id, setId] = useState(0)
    const {uid} = useAppContext()
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [players, setPlayers] = useState([])
    const [groups, setGroups] = useState([])
    const history = useHistory()

    const export_players = {players, setPlayers}
    const export_groups = {groups, setGroups, players}


    function validate_creation() {
        return (nome === "" | descrizione === "")
    }

    useEffect(() =>{
        if(props.id !== undefined){
            setId(props.id)
            load(props.id).then(r => console.debug("Loading complete."))
        }
    },[])


    async function createCampaign(event) {
        if (id!==0) {
            await update(id)
            return
        }
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/campaign/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                titolo: nome,
                descrizione: descrizione,
                admin_id: uid
            })
        })
        if(response.status!==201){
            alert("Verificare di aver inserito valori nel campo delle informazioni generali.")
            return
        }
        const values = await response.json()
        setId(values['id'])
        await update(values['id'])
    }

    async function update(id) {
        let utenti = []
        players.forEach(function (entry) {
            if (entry !== undefined) {
                utenti.push({
                    id: entry.id,
                    comeDm: entry.comeDm,
                    utente: entry.utente
                })
            }
        })
        let gruppi = []
        groups.forEach(function (entry) {
            if (entry !== undefined) {
                let utentiGruppo = []
                entry.users.forEach(function (user) {
                    if (entry !== undefined) {
                        utentiGruppo.push(user.utente)
                    }
                })
                gruppi.push({
                    id: entry.id,
                    nome: entry.nome,
                    attivo: entry.attivo,
                    users: utentiGruppo
                })
            }
        })
        let corpo = {
            titolo: nome,
            descrizione: descrizione,
            utenti: utenti,
            gruppi: gruppi,
            id: id
        }
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/campaign/full/" + id + "/", {
            method: "PUT",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify(
                corpo
            )
        })
        if(response.status===200){
            const values = await response.json()
            alert("Salvataggio completato.")
            history.push("/dashboard")
            return
        }
        alert("Qualcosa è andato storto.")

    }


    async function del(entry){
        if(id === undefined){
            return
        }
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/campaign/details/" + id + "/", {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            }
        })
        if(response.status===204){
            alert("Campagna eliminata.")
            history.push("/dashboard")
            return
        }
        alert("Qualcosa è andato storto.")
    }


    async function load(id) {
        if(id === undefined){
            return
        }
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/campaign/full/" + id + "/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            }
        })
        if(response.status!==200){
            alert("Qualcosa è andato storto.")
            history.push("/dashboard")
            return
        }
        const values = await response.json()

        let check = false

        setPlayers(values.utenti)
        setNome(values.titolo)
        setDescrizione(values.descrizione)
        let array = []
        values.gruppi.forEach(function(entry){
            let users = []
            if(entry!==undefined){
            entry.users.forEach(function(user){
                values.utenti.forEach(function(data){
                    if(data!==undefined){
                    if(data['utente']===user){
                        users.push(data)
                    }}
                })
            })}

            array.push({attivo:entry.attivo, nome:entry.nome, id:entry.id, users:users})
        })
        if(array===undefined){

        }
        else{
            setGroups(array)
        }


    }


    return (
        <div className={Style.DashboardLeft}>
            <Row>
                <Col md={4} sm={12}>
                    <Jumbotron>
                        <h3>Informazioni generali</h3>
                        <Form.Group size="lg" controlId="nome">
                            <Form.Label>Nome campagna</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" rows={5} value={descrizione}
                                          onChange={event => setDescrizione(event.target.value)}/>
                        </Form.Group>

                    </Jumbotron>
                </Col>
                <Col md={8} sm={12}>
                    <Jumbotron>
                        <Row>
                            <Col md={6} sm={12}>
                                <h3> Giocatori </h3>
                                <PlayerPanel {...export_players}/>
                            </Col>
                            <Col md={6} sm={12}>
                                <h3> Gruppi </h3>
                                <GroupPanel {...export_groups}/>
                            </Col>
                        </Row>
                    </Jumbotron>
                    <Button block onClick={event => createCampaign(event)}>Salva le modifiche</Button>
                    <Button block variant={"danger"} onClick={event => del(event)} disabled={!id}>Cancella</Button>
                </Col>
            </Row>
        </div>
    );
}