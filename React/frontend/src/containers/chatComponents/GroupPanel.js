import Style from "./Panel.module.css";
import React, {useEffect} from "react";
import {useAppContext} from "../../libs/Context";
import GroupElement from "./GroupElement";

export default function GroupPanel({groups, setGroups, dmChannelId, setDmChannelId}) {
    const exporter = {groups, setGroups, dmChannelId, setDmChannelId}
    const {uid} = useAppContext()

    if (groups !== undefined) {
        return (
            <div className={Style.GeneralitaPanel}>

                <div>
                    {groups.map(group => <GroupElement group={group} groups={groups} setGroups={setGroups}
                                                       dmChannelId={dmChannelId} setDmChannelId={setDmChannelId}/>)}
                </div>
            </div>)
    }
}