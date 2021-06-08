import Style from "./Panel.module.css";
import React, {useEffect} from "react";
import {Accordion, ListGroup} from "react-bootstrap";
import {useAppContext} from "../../libs/Context";
import GroupElement from "./GroupElement";

export default function GroupPanel({groups, setGroups, channelId, setChannelId}) {
    const exporter = {groups, setGroups, channelId, setChannelId}
    const {uid} = useAppContext()

    if (groups !== undefined) {
        return (
            <div className={Style.GeneralitaPanel}>
                <div>
                    {groups.map(group => <GroupElement group={group} groups={groups} setGroups={setGroups}
                                                       channelId={channelId} setChannelId={setChannelId}/>)}
                </div>
            </div>)
    }
}