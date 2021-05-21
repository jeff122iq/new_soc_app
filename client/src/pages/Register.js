import React from 'react'
import Page from "../components/Page"
import {Link} from "react-router-dom"
import {Button, TextField} from "@material-ui/core"
import "../styles/authForm.css"
import { LOGIN, REGISTER, LOGOUT } from "../actions/actionTypes"

const Register = () => {
    return (
        <Page>
            <form action="" className="loginForm">
                <h1>Register please!</h1>
                <span>Have you account? <Link to="/login">log-in now!</Link></span>
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
                <TextField
                    className={"input"}
                    label={"Confirm password"}
                    type={"password"}
                    variant={"filled"}
                />
                <Button className={"button"}>
                    Register
                </Button>
            </form>
        </Page>
    );
};

export default Register