import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroup} from "react-bootstrap";
export default function CharacterEntry(props) {

    return (
        <div className="CharacterEntry">
            <ListGroup.Item>props.character.name</ListGroup.Item>
        </div>
    );
}