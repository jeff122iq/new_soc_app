import React, {useState} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import Main from "../pages/Main.js"
import About from "../pages/About"
import Contacts from "../pages/Contacts"
import Privacy from "../pages/Privacy"
import LogIn from "../pages/LogIn"
import Register from "../pages/Register"
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import {ACTION_TYPES} from "../actions/actionTypes";
import {connect} from "react-redux";
import Messages from "../pages/Messages";
import Subscribers from "../pages/Subscribers";
import jwtDecode from "jwt-decode";


const Router = (props) => {

    return (
        <BrowserRouter>
                <Switch>
                    <Route path={"/"} exact>
                        <Main/>
                    </Route>
                    <Route path={"/home"} exact>
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
                    <Route path={"/mypage/:username"} exact>
                        <MyPage/>
                    </Route>
                    <Route path={"/messages"} exact>
                        <Messages/>
                    </Route>
                    <Route path={"/subscribers"} exact>
                        <Subscribers/>
                    </Route>
                </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = state => {
    console.log("STATE", state)
    return { state }
}

export default connect(mapStateToProps)(Router)