import Style from "./Panel.module.css";
import React from "react";
import PlayerSelector from "./PlayerSelector";
import PlayerEntry from "./PlayerEntry";
import {ListGroup} from "react-bootstrap";

export default function PlayerPanel({players, setPlayers}) {
    const exporter = {players, setPlayers}
    if(players !== undefined){
    return (
                <div className={Style.GeneralitaPanel}>
                    <PlayerSelector {...exporter}/>
                    <div>
                        <ListGroup>
                            {players.map(player => <PlayerEntry player={player} players={players} setPlayers={setPlayers}/>)}
                        </ListGroup>
                    </div>
                </div>
    )}
    return (<div></div>)
}