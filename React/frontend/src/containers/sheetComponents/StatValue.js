import React, {useEffect, useState} from "react";
import Style from "./statValue.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {Jumbotron} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Input from "reactstrap";

export default function StatValue(props) {

    const [modifier, setModifier] = useState(0)

    useEffect(()=>{
        let val = Math.floor((props.value - 10)/2)
        setModifier(val)
    }, [props.value])

    function update(e){
        if(isNaN(e.target.value) || e.target.value <= 0 || e.target.value > 30){
            return
        }
        props.setValue(e.target.value)
        let val = Math.floor((e.target.value - 10)/2)
        setModifier(val)
    }

    return (
        <div className={Style.Container}>
            <div className={Style.Sfondo}>
                <div className={Style.NomeCaratteristica}>{props.nome}</div>
                <div className={Style.Modificatore}>
                    <div className={Style.ModificatoreTesto}>{modifier}</div>
                </div>
                <div className={Style.ValoreCaratteristica}>
                        <input className={Style.ValoreTesto}
                            type="text"
                            value={props.value}
                            onChange={(e) => update(e)}
                        />
                </div>
            </div>
        </div>
    );
}