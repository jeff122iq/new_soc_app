import React, {useEffect, useState} from 'react'
import HeaderLoggedOut from './HeaderLoggedOut.js'
import Container from './Container.js'
import "../styles/pages.css"
import Footer from "./Footer"
import {connect} from "react-redux";
import HeaderLoggedIn from "./HeaderLoggedIn";
import {ACTION_TYPES} from "../actions/actionTypes";

const Page = (props) => {

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.isAuthenticated()
        }
    })

    return (
        <div>
            {props.isLoggedIn ? <HeaderLoggedIn/> : <HeaderLoggedOut/>}
            <div className={"page"}>
                <Container>
                    <div className={"content"}>
                        {props.children}
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
};

const mapStateToProps = state => {
    const { isLoggedIn } = state
    return {isLoggedIn}
}
const mapDispatchToProps = (dispatch) => {
    return {
        isAuthenticated: () =>{
            dispatch ({
                type: ACTION_TYPES.IS_AUTHENTICATED,
            })
        }}
}


export default connect(mapStateToProps, mapDispatchToProps)(Page)