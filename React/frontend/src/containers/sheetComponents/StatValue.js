import React from "react";
import Style from "./statValue.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {Jumbotron} from "react-bootstrap";
export default function StatValue(props) {
    return (
        <div className={Style.Container}>
            <div className={Style.Sfondo}>
                <div className={Style.NomeCaratteristica}>{props.nome}</div>
                <div className={Style.Modificatore}><div className={Style.ModificatoreTesto}>0</div> </div>
                <div className={Style.ValoreCaratteristica}><div className={Style.ValoreTesto}>0</div> </div>
            </div>
        </div>
    );
}