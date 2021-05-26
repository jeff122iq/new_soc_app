import React from 'react'
import Page from "../components/Page"
import {Link} from "react-router-dom"
import {Button, TextField} from "@material-ui/core"
import "../styles/authForm.css"
import {ACTION_TYPES} from "../actions/actionTypes"
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"

const Register = (props) => {
    const history = useHistory()
    console.log("PROPS =>", props)
    const value = props.state
    const handleRegister = () => {
        props.register()
        props.isAuthenticated()
        history.push("/mypage")
    }

    return (
        <Page>
            <form action="" className="loginForm">
                <h1>Register please!</h1>
                <span>Have you account? <Link to="/login">log-in now!</Link></span>
                <TextField
                    className={"input"}
                    label={"Username"}
                    type={"Username"}
                    variant={"filled"}
                    onChange={e => value.username = e.target.value}
                />
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
                <TextField
                    className={"input"}
                    label={"Confirm password"}
                    type={"password"}
                    variant={"filled"}
                    onChange={e => value.confirmPassword = e.target.value}
                />
                <Button onClick={handleRegister} className={"button"}>
                    Register
                </Button>
            </form>
        </Page>
    );
};

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: () => {
            dispatch({
                type: ACTION_TYPES.REGISTER,
            })
        },
        isAuthenticated: () => {
            dispatch({
                type: ACTION_TYPES.IS_AUTHENTICATED,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)