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

export default function CharacterWizard() {
    const {username} = useAppContext()
    let history = useHistory()
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

    useEffect(() => {
        updateLevel();
    }, [classe]);

    useEffect(() => {
        updateProficiency();
    }, [livello])

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

    return (
        <div className={Style.Wizard}>
            <Row>
                <Col md={4} sm={12}>
                    <div className={Style.BottomMargin}>
                        <GeneralitaPanel {...exporter}/>
                        <Accordion>
                            <ClassPanel {...exporter_classe}/>
                        </Accordion>
                        <Accordion>
                            <AbilitaPanel {...exporter_abilita}/>
                        </Accordion>
                        <Accordion>
                            <IncantesimiPanel/>
                        </Accordion>
                        <Accordion>
                            <InventarioPanel/>
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
                        <Col md={4} sm={12}>
                            <div className={Style.BottomMargin}>
                                <AbilitaList {...exporter_abilita_list}/>
                            </div>
                        </Col>
                    </Row>

                </Col>

            </Row>


        </div>
    );
}