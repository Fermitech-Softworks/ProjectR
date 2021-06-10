import Style from "./AbilitaList.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from "react";

export default function AbilitaListElement({abilita, value}) {


    return (
        <div className={Style.AbilitaEntry}>
                <Row>
                    <Col>{abilita.nome}</Col>
                    <Col>{value}</Col>
                </Row>
        </div>
    )
}