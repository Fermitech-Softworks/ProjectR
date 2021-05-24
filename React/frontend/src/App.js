import logo from './logo.svg';
import './App.css';
import Routes from "./Routes";
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav'
import React, {useEffect, useState} from "react";
import {AppContext} from "./libs/Context"
import {useHistory} from "react-router-dom";


function App() {
    const [isAuth, userHasAuth] = useState(false);
    const [token, userToken] = useState("")
    const [refresh, refreshToken] = useState("")
    const [username, userName] = useState("")
    let history = useHistory()

    function logoff() {
        userHasAuth(false);
        userToken("");
        refreshToken("");
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
        history.push("/")
    }

    useEffect(() => {
        onLoad();
    }, []);


    function onLoad() {
        if (localStorage.getItem("token")) {
            userToken(localStorage.getItem("token"))
            refreshToken(localStorage.getItem("refresh"))
            userHasAuth(true)
        }
    }

    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="#">Rasanhal</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    {isAuth ? (
                        <Nav>
                            <Nav.Link onClick={logoff} href="/">Disconnettiti</Nav.Link>
                        </Nav>
                    ) : (
                        <>
                            <Nav>
                                <Nav.Link href="/login">Accedi</Nav.Link>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
            <div className="App">
                <AppContext.Provider value={{isAuth, userHasAuth, userToken, refreshToken, userName}}>
                    <Routes/>
                </AppContext.Provider>
            </div>
        </div>
    );
}

export default App;
