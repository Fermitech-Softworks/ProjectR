import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import CharacterWizard from "./CharacterWizard";

export default function CharacterDetails() {
    const {id} = useParams();
    useEffect(()=>{
        console.debug(id)
    })
    return (
        <CharacterWizard id={id}/>
    );
}