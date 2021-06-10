import Style from "./Panel.module.css";
import React, {useEffect} from "react";
import GroupEntry from "./GroupEntry.js";
import {Accordion, ListGroup} from "react-bootstrap";
import GroupForm from "./GroupForm";
import {useAppContext} from "../../libs/Context";

export default function GroupPanel({groups, setGroups, players}) {
    const exporter = {groups, setGroups, players}
    const {uid} = useAppContext()

    useEffect(() => {
        cleanUp();
    }, [players]);

    function cleanUp() {
        if (groups !== undefined) {
            setGroups(group => {
                group = group.map(function (entry) {
                    if (typeof entry !== 'undefined') {
                        let array = []
                        if (entry.users !== undefined) {
                            entry.users.forEach(function (entry) {
                                if (players.includes(entry) || entry.utente === uid) {
                                    array.push(entry)
                                }
                            })
                            entry.users = array
                            return entry
                        }
                    }
                })
                return group
            })
        }
    }

    if (groups !== undefined) {
        return (
            <div className={Style.GeneralitaPanel}>
                <GroupForm {...exporter}/>
                <div>
                    <Accordion>
                        {groups.map(group => <GroupEntry group={group} groups={groups} setGroups={setGroups}
                                                         giocatori={players}/>)}
                    </Accordion>
                </div>
            </div>)
    }
}