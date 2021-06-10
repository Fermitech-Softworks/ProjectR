import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Dashboard from "./containers/Dashboard";
import CharacterWizard from "./containers/CharacterWizard";
import CharacterDetails from "./containers/CharacterDetails.htm";
import CampaignWizard from "./containers/CampaignWizard";
import CampaignDetails from "./containers/CampaignDetails";
import ChatRoom from "./containers/ChatRoom";
import Reloader from "./containers/Reloader";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/character/new">
                <CharacterWizard />
            </Route>
            <Route exact path="/character/details/:id" children={<CharacterDetails/>}/>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route exact path="/dashboard/reload">
                <Reloader/>
            </Route>
            <Route exact path="/campaign/new">
                <CampaignWizard/>
            </Route>
            <Route exact path="/campaign/details/:id" children={<CampaignDetails/>}/>
            <Route exact path="/campaign/chat/:id" children={<ChatRoom/>}/>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}