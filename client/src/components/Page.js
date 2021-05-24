import React, {useState} from 'react'
import HeaderloggefOut from './HeaderloggefOut.js'
import Container from './Container.js'
import "../styles/pages.css"
import Footer from "./Footer"
import {connect} from "react-redux";

const Page = ({children}) => {
    return (
        <div>
            <HeaderloggefOut/>
            <div className={"page"}>
                <Container>
                    <div className={"content"}>
                        {children}
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
};

// const mapStateToProps = state => {
//
//     const {isLoggedIn} = state
//
//     return { isLoggedIn }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         login: () =>{
//             dispatch ({
//                 type: ACTION_TYPES.LOGIN,
//                 isLoggedIn: true
//             })
//         }}
// }


export default connect()(Page)