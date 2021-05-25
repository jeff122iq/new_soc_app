import React, {useState} from 'react'
import HeaderLoggedOut from './HeaderLoggedOut.js'
import Container from './Container.js'
import "../styles/pages.css"
import Footer from "./Footer"
import {connect} from "react-redux";
import HeaderLoggedIn from "./HeaderLoggedIn";

const Page = (props) => {

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

export default connect(mapStateToProps)(Page)