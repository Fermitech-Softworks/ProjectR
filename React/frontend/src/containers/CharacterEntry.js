import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroup} from "react-bootstrap";
export default function CharacterEntry({nome,...props}) {

    return (
        <div className="CharacterEntry">
            <ListGroup.Item>{nome}</ListGroup.Item>
        </div>
    );
}