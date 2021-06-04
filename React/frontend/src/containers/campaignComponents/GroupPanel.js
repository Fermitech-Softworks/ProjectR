import Style from "./Panel.module.css";
import React from "react";
import PlayerSelector from "./PlayerSelector";
import GroupEntry from "./GroupEntry.js";
import {ListGroup} from "react-bootstrap";
import GroupForm from "./GroupForm";

export default function GroupPanel({groups, setGroups}) {
    const exporter = {groups, setGroups}
    return (
        <div className={Style.GeneralitaPanel}>
            <GroupForm {...exporter}/>
                <div>
                    <ListGroup>
                        {groups.map(group => <GroupEntry group={group} groups={groups} setGroups={setGroups}/>)}
                    </ListGroup>
                </div>
        </div>)
}