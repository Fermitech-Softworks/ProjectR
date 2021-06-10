import React, {useEffect, useState} from "react";
import Style from "./Panel.module.css";
import {useAppContext} from "../../libs/Context";
import CharacterWizard from "../CharacterWizard";

export default function PlayerCharacters({campagna}) {

    return (
        <div>
            <div className={Style.GeneralitaPanel}>
            {campagna.personaggi.map(character => <CharacterWizard{...character}/>)}
            </div>
        </div>
    );
}