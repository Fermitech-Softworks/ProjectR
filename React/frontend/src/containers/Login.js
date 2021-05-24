import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import {useAppContext} from "../libs/Context";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {userHasAuth} = useAppContext()
    const {userToken} = useAppContext()
    const {refreshToken} = useAppContext()
    const {userName} = useAppContext()
    const history = useHistory();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async function getUsername(){
        let token = localStorage.getItem("token")
        const response = await fetch("http://127.0.0.1:8000/artificier/user/", {
            method: "GET",
            credentials:"include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer "+token
            },
        }).then(function(response){return response.json()}).then(function(values){
            userName(values.results[0].username)
        }).then(function(){history.push("/dashboard")})
    }

    async function HandleSubmit(event) {
        event.preventDefault();
        const csrftoken = getCookie('csrftoken');
        var h = new Headers();
        h.append('X-CSRFToken', "csrftoken");
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            credentials:"include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({"username": username, "password": password}),
        }).then(function(response){
            return response.json()}).then(function(values){
            console.log(values)
            localStorage.setItem("token", values['access'])
            localStorage.setItem("refresh", values['refresh'])
            userHasAuth(true)
            userToken(values['access'])
            refreshToken(values['refresh'])
            getUsername()
        });

    }



    return (
        <div className="Login">
            <Form onSubmit={HandleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}