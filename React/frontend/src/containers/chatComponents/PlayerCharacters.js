import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Style from "./Selector.module.css";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import CharacterWizard from "../CharacterWizard";
import CharacterList from "../CharacterList";

export default function PlayerCharacters({campagna}) {

    const [charList, setCharList] = useState([])
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [id, setId] = useState(0)
    const [selectInput, setSelectInput] = useState([])
    const {uid} = useAppContext()


    return (
        <div>
            {campagna.personaggi.map(character => <CharacterWizard{...character}/>)}
        </div>
    );
}