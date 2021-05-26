import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Dashboard from "./containers/Dashboard";
import CharacterWizard from "./containers/CharacterWizard";

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
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}