import React from 'react'
import Page from "../components/Page"
import {Link} from "react-router-dom"
import {Button, TextField} from "@material-ui/core"
import "../styles/authForm.css"

const LogIn = () => {
    return (
        <Page>
            <form action="" className="loginForm">
                    <h1>Log-in please!</h1>
                    <span>Haven't account? <Link to="/register">Create now!</Link></span>
                    <TextField
                        className={"input"}
                        label={"Email"}
                        type={"email"}
                        variant={"filled"}
                    />
                    <TextField
                        className={"input"}
                        label={"Password"}
                        type={"password"}
                        variant={"filled"}
                    />
                    <Button className={"button"}>
                        Log-in
                    </Button>
                </form>
        </Page>
    );
};

export default LogIn