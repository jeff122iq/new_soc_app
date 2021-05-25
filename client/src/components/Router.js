import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import Main from "../pages/Main.js"
import About from "../pages/About"
import Contacts from "../pages/Contacts"
import Privacy from "../pages/Privacy"
import LogIn from "../pages/LogIn"
import Register from "../pages/Register"
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";


const Router = () => {

    const isAuthentiticated = localStorage.getItem("token")

    return (
        <BrowserRouter>
            {isAuthentiticated
                ?
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
                    <Route path={"/mypage"} exact>
                        <MyPage/>
                    </Route>
                </Switch>
                :
                <Switch>
                    <Route path={"/"} exact>
                        <Main/>
                    </Route>
                    <Route path={"/contacts"} exact>
                        <Contacts/>
                    </Route>
                    <Route path={"/about"} exact>
                        <About/>
                    </Route>
                    <Route path={"/register"} exact>
                        <Register/>
                    </Route>
                    <Route path={"/login"} exact>
                        <LogIn/>
                    </Route>
                    <Redirect to={"/"}/>
                </Switch>
            }
        </BrowserRouter>
    );
}

export default Router