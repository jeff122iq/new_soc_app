import React, {useState} from 'react'
import Page from "../components/Page"
import {Link} from "react-router-dom"
import {Button, TextField} from "@material-ui/core"
import "../styles/authForm.css"
import {connect} from "react-redux";
import { ACTION_TYPES } from "../actions/actionTypes";
import {useHistory} from "react-router-dom"

const LogIn = ( props ) => {
    const value = props.state
    const history = useHistory()

    const handleLogin = () => {
        props.login()
        history.push("/mypage")
    }

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
                        onChange={e => value.email = e.target.value}
                    />
                    <TextField
                        className={"input"}
                        label={"Password"}
                        type={"password"}
                        variant={"filled"}
                        onChange={e => value.password = e.target.value}
                    />
                    <Button
                        className={"button"}
                        onClick={handleLogin}
                    >
                        Log-in
                    </Button>
                </form>
        </Page>
    );
};

const mapStateToProps = state => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch ({
                type: ACTION_TYPES.LOGIN,
            })
        },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LogIn)