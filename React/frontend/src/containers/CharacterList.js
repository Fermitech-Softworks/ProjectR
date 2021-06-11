import React, {useEffect, useState} from "react";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroup} from "react-bootstrap";
import CharacterEntry from "./CharacterEntry";
import {Link, useHistory} from "react-router-dom";

export default function CharacterList() {
    const [characterList, setCharacterList] = useState([]);
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    let history = useHistory()

    useEffect(() => {
        onLoad();
    }, [userToken]);

    function compare( a, b ) {
        if ( a.nome < b.nome ){
            return -1;
        }
        if ( a.nome > b.nome ){
            return 1;
        }
        return 0;
    }

    async function onLoad() {
        let token = localStorage.getItem("token")
        const response = await fetch(address+"/artificier/characters/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer "+token
            },
        })
        if(response.status===404){
            return
        }
        const values = await response.json()
        let charData = values['results']
        if(charData!==undefined){
        charData.sort(compare)
        setCharacterList(values['results'])}
    }

    const redirect = (path) =>{
        history.push(path)
    }

    return (
        <div className="CampaignList">
            <Jumbotron>
                <h3>I tuoi personaggi  <Link to="/character/new">+</Link></h3>
                <ListGroup>
                    {characterList.map(char => <CharacterEntry {...char}/>)}
                </ListGroup>
            </Jumbotron>
        </div>
    );
}