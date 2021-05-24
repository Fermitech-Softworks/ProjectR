import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroup} from "react-bootstrap";
import CharacterEntry from "./CharacterEntry";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default function CharacterList() {
    const [characterList, setCharacterList] = useState(null);
    const {userToken} = useAppContext()

    useEffect(() => {
        generateContent();
    }, []);

    async function onLoad() {
        let token = localStorage.getItem("token")
        console.log(token)
        const response = await fetch("http://127.0.0.1:8000/artificier/characters/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer "+token
            },
        }).then(function(response){
            return response.json()
        }).then(function(values){
            setCharacterList(values['results'])
        });
    }

    async function generateContent(){
        await onLoad().then(function (){

        })
    }


    return (
        <div className="CampaignList">
            <Jumbotron>
                <h3>I tuoi personaggi </h3>
                <ListGroup>

                </ListGroup>
            </Jumbotron>
        </div>
    );
}
//function GetToken(){
//    const {userToken} = useAppContext()
//    return {userToken}
//}
//
//export class CharacterList extends React.Component{
//
//    componentDidMount() {
//        console.log(GetToken)
//    }
//
//    render() {
//        return(
//        <div className="CampaignList">
//            <Jumbotron>
//                <h3>I tuoi personaggi {GetToken}</h3>
//            </Jumbotron>
//        </div>)
//    }
//}
//
//export default CharacterList