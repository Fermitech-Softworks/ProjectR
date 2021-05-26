import React, {useState} from "react";
import Style from "./Dashboard.module.css";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
export default function CampaignList() {
    const [campaignList, setCampaignList] = useState(null);
    const {userToken} = useAppContext()

    return (
        <div className="CampaignList">
            <Jumbotron>
                <h3>Le tue avventure</h3>
            </Jumbotron>
        </div>
    );
}