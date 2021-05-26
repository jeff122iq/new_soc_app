import React, {useEffect, useState} from 'react';
import UserPage from "../components/UserPage";
import jwtDecode from "jwt-decode";
import {Avatar} from "@material-ui/core";
import axios from "axios";

const MyPage = () => {

    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    const [status, setStatus] = useState([])

    const getStatus = async () => {
        try {
            const response = await axios.get("https://mashape-community-skate-ipsum.p.rapidapi.com/1/1/JSON", { headers: {
                    'x-rapidapi-key': '0880eb4848mshcfcac79e5f0d32ap1aeafbjsnabbdf81524fd',
                    'x-rapidapi-host': 'mashape-community-skate-ipsum.p.rapidapi.com'
                }})
            status.push(response)
            console.log(status[0].data[0])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(async () => {
        await getStatus()
    }, [])

    return (
        <UserPage>
            <div className="userInfo">
                <Avatar className="avatar">
                    {decode.username[0]}
                </Avatar>
                <div className="userName">
                    <h1>{decode.username}</h1>
                    <p>{decode.email}</p>
                    <span>Status:</span>
                    {/*<p>{status[0].data[0]}</p>*/}
                </div>
            </div>
        </UserPage>
    );
};

export default MyPage;