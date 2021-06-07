import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import CharacterWizard from "./CharacterWizard";
import CampaignWizard from "./CampaignWizard";

export default function CampaignDetails() {
    const {id} = useParams();
    useEffect(()=>{
        console.debug(id)
    })
    return (
        <CampaignWizard id={id}/>
    );
}