import React, {useState} from 'react'
import Page from "../components/Page"
import {Link} from "react-router-dom"
import {Button, Snackbar, TextField} from "@material-ui/core"
import "../styles/authForm.css"
import {connect} from "react-redux";
import {ACTION_TYPES} from "../actions/actionTypes";
import {useHistory} from "react-router-dom"
import {Alert} from "@material-ui/lab";

const LogIn = (props) => {
    const [open, setOpen] = useState(false);
    const value = props.state
    const history = useHistory()

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogin = () => {
        const isLoggedIn = props.login()
        if (!isLoggedIn) {
            console.log(123)
            setOpen(true)
            return
        } else {
            return history.push("/home")
        }
    }

    return (
        <Page>
                <Snackbar style={{cursor: "pointer"}} open={open} autoHideDuration={6000} onClick={handleClose}>
                    <Alert severity="error">
                        This is a success message!
                    </Alert>
                </Snackbar>
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
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch({
                type: ACTION_TYPES.LOGIN,
            })
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn)