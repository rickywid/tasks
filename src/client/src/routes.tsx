import React from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";

import Root from "./components/main";

const Routes = (
    <Switch>
        <Route exact path="/" component={Root} />
    </Switch>
)

export default Routes;
