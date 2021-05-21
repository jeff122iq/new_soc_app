import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "../pages/Home.js"
import About from "../pages/About"
import Contacts from "../pages/Contacts"
import Privacy from "../pages/Privacy"
import LogIn from "../pages/LogIn"
import Register from "../pages/Register"


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact>
                  <Home/>
                </Route>
                <Route path={"/about"} exact>
                    <About/>
                </Route>
                <Route path={"/contacts"} exact>
                    <Contacts/>
                </Route>
                <Route path={"/privacy"} exact>
                    <Privacy/>
                </Route>
                <Route path={"/login"} exact>
                    <LogIn/>
                </Route>
                <Route path={"/register"} exact>
                    <Register/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router