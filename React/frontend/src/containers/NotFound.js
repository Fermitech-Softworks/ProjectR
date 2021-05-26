import React from "react";
import Style from "./NotFound.module.css";

export default function NotFound() {
    return (
        <div className={Style.NotFound+"text-center"}>
            <h1>404</h1>
            <h2>Whoops!</h2>
            <h3>You ended up in an empty demiplane.</h3>
        </div>
    );
}