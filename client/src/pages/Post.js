import React, {useEffect} from 'react';
import { useParams } from "react-router-dom"
import UserPage from "../components/UserPage";
import {connect} from "react-redux";
import {ACTION_TYPES} from "../actions/actionTypes";
import { getUserPost } from "../store";


const Post = ( props ) => {

    const { id } = useParams()

    useEffect(() => {
        props.getUserPost( id )
    }, [])

    return (
        <UserPage>
            <h1>Post: { id }</h1>
        </UserPage>
    );
};

const mapStateToProps = state => {
    return { state }
}

export default connect( mapStateToProps, { getUserPost })( Post );