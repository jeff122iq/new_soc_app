import React from 'react';
import "../styles/header.css"
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {ACTION_TYPES} from "../actions/actionTypes";
import {useHistory} from "react-router-dom"

const HeaderLoggedIn = (props) => {
    const history = useHistory()

    const handleLogout = () => {
        history.push("/login")
        props.logout()
    }

    return (
        <header className="header">
            <h1>HeaderLoggedIn</h1>
            <Button style={{
                background: "red",
                color: "#ffffff"
            }}
            onClick={handleLogout}
            >LOGOUT</Button>
        </header>
    );
};

const mapStateToProps = state => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () =>{
            dispatch ({
                type: ACTION_TYPES.LOGOUT,
            })
        }}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoggedIn);