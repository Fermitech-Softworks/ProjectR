import React, {useEffect, useState} from "react";
import {useAppContext} from "../libs/Context";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link, useHistory} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup"
import CampaignEntry from "./CampaignEntry";

export default function CampaignList() {
    const [campaignList, setCampaignList] = useState([]);
    const {userToken} = useAppContext()
    const {address} = useAppContext()
    const history = useHistory()

    useEffect(() => {
        onLoad()
    }, [address])

    function compare(a, b) {
        if (a.nome < b.nome) {
            return -1;
        }
        if (a.nome > b.nome) {
            return 1;
        }
        return 0;
    }

    async function onLoad() {
        let token = localStorage.getItem("token")
        const response = await fetch(address + "/bard/campaign/", {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': "",
                'Authorization': "Bearer " + token
            },
        })
        if(response.status===404){
            history.push("/dashboard/reload")
            return
        }
        const values = await response.json()
        let campData = values['results']
        if (campData !== undefined) {
            campData.sort(compare)
            setCampaignList(values['results'])
        }
    }

    return (
        <div className="CampaignList">
            <Jumbotron>
                <h3>Le tue avventure <Link to="/campaign/new">+</Link></h3>
                <ListGroup>
                    {campaignList.map(campaign => <CampaignEntry {...campaign}/>)}
                </ListGroup>
            </Jumbotron>
        </div>
    );
}