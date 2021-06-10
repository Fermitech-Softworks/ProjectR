import React, {useEffect} from "react";
import Style from "./Dashboard.module.css";
import CampaignList from "./CampaignList";
import CharacterList from "./CharacterList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import {useHistory} from "react-router-dom";
import {useAppContext} from "../libs/Context";
export default function Dashboard() {
    const {username} = useAppContext()
    const history = useHistory()

    useEffect(()=>{
        history.push("/dashboard")
    }, [])

    return (
        <div className={Style.Dashboard}>
            Attendere...
        </div>
    );
}