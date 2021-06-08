import Style from "./Panel.module.css";
import React, {useEffect} from "react";
import {Accordion, ListGroup} from "react-bootstrap";
import {useAppContext} from "../../libs/Context";
import Message from "./Message";

export default function ChatLog({messageLog, listaPlayer}) {
    const {uid} = useAppContext()

    return (
        <div className={Style.GeneralitaPanel}>
            <div>
                {messageLog.map(message => <Message message={message} listaPlayer={listaPlayer}/>)}
            </div>
        </div>)
}