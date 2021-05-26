import React from "react";
import Style from "./Home.module.css";

export default function Home() {
    return (
        <div className={Style.Home}>
            <div className={Style.lander}>
                <h1>Rasanhal</h1>
                <p className="text-muted">The play-by-chat webapp designed for small communities.</p>
            </div>
        </div>
    );
}