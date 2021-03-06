import Style from "./Panel.module.css";
import React, {useEffect, useState} from "react";
import {useAppContext} from "../../libs/Context";
import Message from "./Message";

export default function ChatLog({messageLog, listaPlayer, autoScroll, setMessageLog, userGroups, setReplyId}) {
    const {uid} = useAppContext()
    const {address} = useAppContext()

    useEffect(()=>{
        loadMessages()
    },[userGroups])

    function compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    async function loadMessages() {
        let list = []
        console.debug("Caricamento messaggi...")
        let token = localStorage.getItem("token")
        console.debug(userGroups)
        for (const entry of userGroups) {
            const response = await fetch(address + "/bard/messages/", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': "",
                    'Authorization': "Bearer " + token
                },
                body:JSON.stringify({"gid":entry})
            })
            let data = await response.json()
            data.forEach(function (e){
                list.push(e)
            })
        }
        list.sort(compare)
        setMessageLog(list)
    }

    return (
        <div className={Style.GeneralitaPanel}>
            <div>
                {messageLog.map(message => <Message message={message} listaPlayer={listaPlayer} autoScroll={autoScroll} setReplyId={setReplyId}/>)}
            </div>
        </div>)
}