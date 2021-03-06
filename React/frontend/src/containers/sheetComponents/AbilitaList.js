import Style from "./AbilitaList.module.css";
import React, {useEffect, useState} from "react";
import {useAppContext} from "../../libs/Context";
import AbilitaListElement from "./AbilitaListElement";

export default function AbilitaList({abilita, setAbilita, statistiche, proficiency}) {

    const {address} = useAppContext()
    const [elements, setElements] = useState([])
    const [abilitaList, setAbilitaList] = useState([])

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

    useEffect(() => {
        draw()
    }, [abilita, proficiency, statistiche, abilitaList])

    async function onLoad() {
        let token = localStorage.getItem("token")
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
        draw()
    }

    function draw() {
        setElements(elements => {
            elements = abilitaList.map(function (entry) {
                let grado = 0;
                abilita.forEach(function (data) {
                    if (typeof data !== 'undefined') {
                        if (entry.id === parseInt(data.abilita_id)) {
                            grado = data.grado
                        }
                    }
                })
                let value = 0
                switch (entry.attributo) {
                    case "forza":
                        value = Math.floor((statistiche.forza - 10) / 2)
                        break;
                    case "destrezza":
                        value = Math.floor((statistiche.destrezza - 10) / 2)
                        break;
                    case "intelligenza":
                        value = Math.floor((statistiche.intelligenza - 10) / 2)
                        break;
                    case "costituzione":
                        value = Math.floor((statistiche.costituzione - 10) / 2)
                        break;
                    case "saggezza":
                        value = Math.floor((statistiche.saggezza - 10) / 2)
                        break;
                    case "carisma":
                        value = Math.floor((statistiche.carisma - 10) / 2)
                }
                switch (grado) {
                    case 1:
                        value = value + Math.floor(proficiency / 2)
                        break;
                    case 2:
                        value = value + proficiency
                        break;
                    case 3:
                        value = value + proficiency * 2
                        break;
                }
                let data = {
                    abilita: entry,
                    value: value
                }
                return data;
            })
            return elements
        })
    }

    return (
        <div>
            <div className={Style.DescriptionContainer}>
                {elements.map(elem => <AbilitaListElement {...elem}/>)}
            </div>
        </div>
    )
}