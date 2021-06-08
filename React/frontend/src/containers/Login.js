import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Style from "./Login.module.css";
import {useAppContext} from "../libs/Context";
import {useHistory} from "react-router-dom";

export default function Login() {
    const [username, setUsernameF] = useState("");
    const [password, setPassword] = useState("");
    const {setUserHasAuth} = useAppContext()
    const {setUid} = useAppContext()
    const {setUserToken} = useAppContext()
    const {setRefreshToken} = useAppContext()
    const {setUsername} = useAppContext()
    const {address} = useAppContext()
    const {setAddress} = useAppContext()
    const {setSuperUser} = useAppContext()
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

    async function getUsername() {
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/artificier/user/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            }
        })
        const values = await response.json()
        console.debug(values)
        setUsername(values.results[0].username)
        setSuperUser(values.results[0].is_superuser)
        setUid(values.results[0].id)
        localStorage.setItem("username", values.results[0].username)
        localStorage.setItem("isSuperUser", values.results[0].is_superuser)
        localStorage.setItem("uid", values.results[0].id)
        console.log(values)
    }

    async function HandleSubmit(event) {
        event.preventDefault();
        const csrftoken = getCookie('csrftoken');
        var h = new Headers();
        h.append('X-CSRFToken', "csrftoken");
        try {
            const response = await fetch(address + "/api/token/", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({"username": username, "password": password}),
            })
            if (response.status === 200) {
                const values = await response.json()
                console.log(values)
                localStorage.setItem("token", values['access'])
                localStorage.setItem("refresh", values['refresh'])
                localStorage.setItem("serverAddress", address)

                setUserHasAuth(true)
                setUserToken(values['access'])
                setRefreshToken(values['refresh'])
                document.cookie = "token=" + values['access']
                const data = await getUsername()
                history.push("/dashboard")
            } else {
                alert("Le credenziali inserite non sono corrette.")
            }
        } catch (e) {
            alert("Il server non risponde. Verificare l'indirizzo dell'istanza.")
        }

    }


    return (
        <div className={Style.Login}>
            <Form onSubmit={HandleSubmit}>
                <Form.Group size="lg" controlId="instanceIp">
                    <Form.Label>Indirizzo del server</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsernameF(e.target.value)}
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