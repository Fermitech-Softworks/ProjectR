import logo from './logo.svg';
import './App.css';
import Routes from "./Routes";
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav'
import React, {useEffect, useState} from "react";
import {AppContext} from "./libs/Context"
import {Link, useHistory} from "react-router-dom";



function App() {
    const [isAuth, setUserHasAuth] = useState(false);
    const [token, setUserToken] = useState("")
    const [refresh, setRefreshToken] = useState("")
    const [username, setUsername] = useState("")
    const [uid, setUid] = useState(0)
    const [address, setAddress] = useState("")
    const [isSuper, setSuperUser] = useState("")
    let history = useHistory()

    function logoff() {
        setUserHasAuth(false);
        setUserToken("");
        setRefreshToken("");
        localStorage.removeItem("token")
        localStorage.removeItem("uid")
        localStorage.removeItem("username")
        localStorage.removeItem("isSuperUser")
        localStorage.removeItem("login")
        localStorage.removeItem("refresh")
        document.cookie = "token=; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        history.push("/")
    }

    useEffect(() => {
        onLoad();
    }, []);


    function onLoad() {
        console.log("reloading...")
        if (localStorage.getItem("serverAddress")){
            setAddress(localStorage.getItem("serverAddress"))
        }
        if (localStorage.getItem("token")) {
            setUserToken(localStorage.getItem("token"))
            setRefreshToken(localStorage.getItem("refresh"))
            setUserHasAuth(true)
            setUsername(localStorage.getItem("username"))
            setSuperUser(localStorage.getItem("isSuperUser"))
            setUid(parseInt(localStorage.getItem("uid")))
            history.push("/dashboard")
        }
    }

    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="dark">
                {isAuth ? (
                    <Navbar.Brand><Link to="/dashboard">Rasanhal</Link></Navbar.Brand>
                ) : (
                    <Navbar.Brand href="/">Rasanhal</Navbar.Brand>
                )}
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">

                    {isAuth ? (
                        <Nav>
                            {isSuper ? (<Nav.Link href={address+"/admin"} target="_blank">Admin</Nav.Link>) : (<div></div>)}
                            <Nav.Link onClick={logoff}>Disconnettiti</Nav.Link>
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
                <AppContext.Provider value={{isAuth, isSuper, setSuperUser, setUserHasAuth, setUserToken, setRefreshToken, setUsername, setAddress, address, token, refresh, username, uid, setUid}}>
                    <Routes/>
                </AppContext.Provider>
            </div>
        </div>
    );
}

export default App;
