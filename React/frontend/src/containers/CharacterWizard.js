import React, {useEffect, useState} from "react";
import Style from "./CharacterWizard.module.css";
import CampaignList from "./CampaignList";
import CharacterList from "./CharacterList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {useAppContext} from "../libs/Context";
import {Jumbotron} from "react-bootstrap";
import StatValue from "./sheetComponents/StatValue";
import SpecieSelector from "./sheetComponents/SpecieSelector";
import {useHistory} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import GeneralitaPanel from "./sheetComponents/GeneralitaPanel";
import ClassPanel from "./sheetComponents/ClassPanel";
import AbilitaPanel from "./sheetComponents/AbilitaPanel";
import IncantesimiPanel from "./sheetComponents/IncantesimiPanel";
import InventarioPanel from "./sheetComponents/InventarioPanel";
import AbilitaList from "./sheetComponents/AbilitaList";

export default function CharacterWizard(props) {
    const {username} = useAppContext()
    const {uid} = useAppContext()
    let history = useHistory()
    const {address} = useAppContext()
    const [forza, setForza] = useState(10)
    const [destrezza, setDestrezza] = useState(10)
    const [costituzione, setCostituzione] = useState(10)
    const [intelligenza, setIntelligenza] = useState(10)
    const [saggezza, setSaggezza] = useState(10)
    const [carisma, setCarisma] = useState(10)
    const [nome, setNome] = useState("")
    const [pvAttuali, setPvAttuali] = useState(1)
    const [pvMax, setPvMax] = useState(1)
    const [livello, setLivello] = useState(0)
    const [proficiency, setProficiency] = useState(0)
    const [classeArmatura, setClasseArmatura] = useState(10)
    const [specie, setSpecie] = useState({})
    const [classe, setClasse] = useState([])
    const [abilita, setAbilita] = useState([])
    const [incantesimi, setIncantesimi] = useState([])
    const [inventario, setInventario] = useState([])
    const [note, setNote] = useState("")
    const [charId, setCharId] = useState(0)
    const [editable, setEditable] = useState(true)

    useEffect(() => {
        updateLevel();
    }, [classe]);

    useEffect(() => {
        updateProficiency();
    }, [livello])

    useEffect(() => {
        console.debug("ID: " + props.id)
        if (props.id !== undefined && props.id !== 0) {
            setCharId(props.id)
            console.debug("Found id.")
            loadCharData(props.id)
        }
    }, [props.id])

    function updateLevel() {
        let livello = 0
        classe.forEach(function (entry) {
            livello += parseInt(entry.livello)
        })
        setLivello(livello)
    }

    function updateProficiency() {
        if (livello === 0) {
            setProficiency(0)
            return
        }
        let value = Math.floor(livello / 4) + 2
        setProficiency(value)
    }

    const exporter = {
        nome, setNome, pvAttuali, setPvAttuali, pvMax, setPvMax, livello, setLivello,
        proficiency, setProficiency, classeArmatura, setClasseArmatura, specie, setSpecie
    }
    const exporter_classe = {classe, setClasse}

    const exporter_abilita = {abilita, setAbilita}

    const statistiche = {forza, destrezza, costituzione, intelligenza, saggezza, carisma}

    const exporter_abilita_list = {abilita, setAbilita, statistiche, proficiency}

    const exporter_incantesimi = {incantesimi, setIncantesimi}

    const exporter_inventario = {inventario, setInventario}

    async function loadCharData(id) {
        console.debug("Loading data for character " + id)
        console.debug("Connecting...")
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/artificier/characters/full/" + id + "/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
        })
        let values
        console.debug(response.status)
        if (response.status !== 200) {

            setEditable(false)
            const resp = await fetch(address + "/bard/campaign/characters/" + id + "/", {
                method: "GET",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': "",
                    'Authorization': "Bearer " + token
                },
            })
            if (resp.status!==200){
                alert("Non si dispone dei privilegi per accedere alla risorsa.")
                history.push("/dashboard")
                return
            }
            values = await resp.json()
            console.debug(values)
        } else {
            values = await response.json()
        }
        console.debug("Now saving data...")
        console.debug(values)
        setNome(values['nome'])
        setPvAttuali(values['pv_attuali'])
        setPvMax(values['pv_max'])
        setClasseArmatura(values['classe_armatura'])
        setProficiency(values['capacita'])
        setLivello(values['livello'])
        console.debug(livello)
        setForza(values['forza'])
        setDestrezza(values['destrezza'])
        setIntelligenza(values['intelligenza'])
        setSaggezza(values['saggezza'])
        console.debug(values['saggezza'])
        setCarisma(values['carisma'])
        setCostituzione(values['costituzione'])
        setNote(values['note'])
        setSpecie({id: values['specie']['id'], nome: values['specie']['nome'], dettagli: values['specie']['dettagli']})
        let inv = []
        values['oggetti'].forEach(function (entry) {
            inv.push({
                id: entry['id'], quantita: entry['quantita'], oggetto_id: entry['oggetto']['id'], oggetto: {
                    nome: entry['oggetto']['nome'],
                    dettagli: entry['oggetto']['dettagli'],
                    costo: entry['oggetto']['costo']
                }
            })
        })
        let abi = []
        values['abilita'].forEach(function (entry) {
            abi.push({
                id: entry['id'], grado: entry['grado'], abilita_id: entry['abilita']['id'], abilita: {
                    nome: entry['abilita']['nome'],
                    dettagli: entry['abilita']['dettagli'],
                    attributo: entry['abilita']['attributo']
                }
            })
        })
        let cla = []
        values['classi'].forEach(function (entry) {
            cla.push({
                id: entry['id'], livello: entry['livello'], classe_id: entry['classe']['id'], classe: {
                    nome: entry['classe']['nome'], dettagli: entry['classe']['dettagli']
                }
            })
        })
        let inc = []
        values['incantesimi'].forEach(function (entry) {
            inc.push({
                id: entry['id'],
                preparata: entry['preparato'],
                incantesimo_id: entry['incantesimo']['id'],
                incantesimo: {
                    nome: entry['incantesimo']['nome'],
                    dettagli: entry['incantesimo']['descrizione'],
                    scuola: entry['incantesimo']['scuola'],
                    componenti: entry['incantesimo']['componenti'],
                    dadi: entry['incantesimo']['dadi']
                }
            })
        })
        setInventario(inv)
        setAbilita(abi)
        setClasse(cla)
        setIncantesimi(inc)
    }

    async function create(event) {
        if (charId !== 0) {
            await update(charId)
            return
        }
        let token = localStorage.getItem("token")
        console.debug("Saving...")
        const response = await fetch(address + "/artificier/characters/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                nome: nome,
                pv_max: pvMax,
                pv_attuali: pvAttuali,
                classe_armatura: classeArmatura,
                capacita: proficiency,
                livello: livello,
                forza: forza,
                destrezza: destrezza,
                intelligenza: intelligenza,
                saggezza: saggezza,
                carisma: carisma,
                costituzione: costituzione,
                user: uid,
                specie: specie.id
            })
        })
        if(response.status!==201){
            alert("Verificare di aver inserito tutti i campi necessari nel pannello generalità.")
            return
        }
        const values = await response.json()
        console.debug(values)
        setCharId(values.id)
        console.debug(values.id)
        await update(values.id)
    }

    function check() {
        return !(nome || forza || destrezza || costituzione || intelligenza || saggezza || carisma || pvAttuali || pvMax || livello || proficiency || classeArmatura || specie || note)
    }

    async function update(id) {
        console.debug("updating...")
        let oggetti_upload = []
        inventario.forEach(function (entry) {
            if (entry !== undefined) {
                oggetti_upload.push({
                    id: entry.id,
                    quantita: entry.quantita,
                    oggetto: entry.oggetto_id
                })
            }
        })
        let classi_upload = []
        classe.forEach(function (entry) {
            if (entry !== undefined) {
                classi_upload.push({
                    id: entry.id,
                    livello: entry.livello,
                    classe: entry.classe_id
                })
            }
        })
        let abilita_upload = []
        abilita.forEach(function (entry) {
            if (entry !== undefined) {
                abilita_upload.push({
                    id: entry.id,
                    grado: entry.grado,
                    abilita: entry.abilita_id
                })
            }
        })
        let incantesimi_upload = []
        incantesimi.forEach(function (entry) {
            if (entry !== undefined) {
                incantesimi_upload.push({
                    id: entry.id,
                    preparato: entry.preparata,
                    incantesimo: entry.incantesimo_id
                })
            }
        })
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/artificier/characters/details/" + id + "/", {
            method: "PUT",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                nome: nome,
                pv_max: pvMax,
                pv_attuali: pvAttuali,
                classe_armatura: classeArmatura,
                capacita: proficiency,
                livello: livello,
                forza: forza,
                destrezza: destrezza,
                intelligenza: intelligenza,
                saggezza: saggezza,
                carisma: carisma,
                costituzione: costituzione,
                user: uid,
                specie: specie.id,
                oggetti: oggetti_upload,
                abilita: abilita_upload,
                classi: classi_upload,
                incantesimi: incantesimi_upload
            })
        })
        if (response.status === 200) {
            const values = await response.json()
            console.debug(values)
            alert("Dati salvati con successo.")
            return
        }
        alert("Si è verificato un errore.")
    }

    return (
        <div className={Style.Wizard}>
            <Row>
                <Col md={4} sm={12}>
                    <div className={Style.BottomMargin}>
                        <Accordion>
                            <GeneralitaPanel {...exporter}/>
                            <ClassPanel {...exporter_classe}/>
                            <AbilitaPanel {...exporter_abilita}/>
                            <IncantesimiPanel {...exporter_incantesimi}/>
                            <InventarioPanel {...exporter_inventario}/>
                        </Accordion>
                    </div>
                </Col>
                <Col md={8} sm={12}>
                    <Row>
                        <Col>
                            <StatValue nome="Forza" value={forza} setValue={setForza}/>
                        </Col>
                        <Col>
                            <StatValue nome="Destrezza" value={destrezza} setValue={setDestrezza}/>
                        </Col>
                        <Col>
                            <StatValue nome="Costituzione" value={costituzione} setValue={setCostituzione}/>
                        </Col>
                        <Col>
                            <StatValue nome="Intelligenza" value={intelligenza} setValue={setIntelligenza}/>
                        </Col>
                        <Col>
                            <StatValue nome="Saggezza" value={saggezza} setValue={setSaggezza}/>
                        </Col>
                        <Col>
                            <StatValue nome="Carisma" value={carisma} setValue={setCarisma}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12}>
                            <div className={Style.BottomMargin}>
                                <AbilitaList {...exporter_abilita_list}/>
                            </div>
                        </Col>
                        <Col md={6} sm={12}>
                            <div className={Style.LeftAlign}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control as="textarea" rows={13} onChange={setNote}/>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>

                </Col>

            </Row>
            <Button onClick={event => create(event)} disabled={!editable}>Salva le modifiche</Button>
        </div>
    );
}