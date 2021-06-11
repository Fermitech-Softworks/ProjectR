import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import Button from "react-bootstrap/Button";
import Select from "react-select";

export default function PlayerSelector({players, setPlayers, playerList}) {

    const [userList, setUserList] = useState([])
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const [userId, setUserId] = useState(0)
    const [selectInput, setSelectInput] = useState([])
    const {uid} = useAppContext()

    useEffect(() => {
        if(playerList!==undefined){
            setUserList(playerList)
        }
        else{
        onLoad()};
    }, [playerList]);

    useEffect(() => {
        setSelectInput(userList.map(function (entry) {
            return {label: entry.username, value: entry.id}
        }))
    }, [userList, players])


    function compare(a, b) {
        if (a.username < b.username) {
            return -1;
        }
        if (a.username > b.username) {
            return 1;
        }
        return 0;
    }


    async function onLoad() {
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/artificier/users/", {
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
        let userData = values['results']
        userData.sort(compare)
        let array = []
        userData.forEach(function(entry){
            if(entry.id===uid){

            }
            else{
                array.push(entry)
            }
        })
        setUserList(array)
    }

    function update(event) {
        let value = event.value
        if (value < 0) {
            setUserId(0)
            return
        }
        setUserId(value)
    }

    function addUser(event) {
        let present = false;
        players.forEach(function (entry) {
            if (entry !== undefined) {
                if (userId == entry.utente) {
                    present = true;
                }
            }
        })
        if (!present) {
            userList.forEach(function (entry) {
                if (entry != undefined) {
                    if (entry.id == userId) {
                        setPlayers(players => [...players, {
                            username: entry.username,
                            utente: entry.id,
                            comeDm: false,
                            id: null
                        }])
                    }
                }
            })
        }
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">

                <Form.Label>Aggiungi un giocatore</Form.Label>
                <Row>

                    <Col md={8} sm={12}>
                        <Select options={selectInput} name="incantesimi" placeholder="..." onChange={event => {
                            update(event)
                        }}/>
                    </Col>
                    <Col md={4} sm={12}>
                        <Button block type="submit" disabled={!userId} onClick={event => {
                            addUser(event)
                        }}>
                            Aggiungi
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </div>
    );
}