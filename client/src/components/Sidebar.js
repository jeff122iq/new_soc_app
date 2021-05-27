import React, {useEffect, useState} from 'react';
import "../styles/sideBar.css"
import {NavLink} from "react-router-dom";
import jwtDecode from "jwt-decode";

const Sidebar = () => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const decode = jwtDecode(token)
    console.log(decode.username)

    useEffect( async () => {
        await setToken(token)
        console.log(token)
    }, [token])

    const sidebarMenu = [
        {
            name: "Home",
            link: "/home"
        },
        {
            name: "My page",
            link: `/mypage/${decode.username}`
        },
        {
            name: "Messages",
            link: "/messages"
        },
        {
            name: "Subscribers",
            link: "/subscribers"
        }
    ]


    return (
        <div className="sideBar">
            <ul>
                {sidebarMenu.map((item, idx) => {
                    return (
                        <NavLink key={idx} to={item.link}>
                            {item.name}
                        </NavLink>
                    )
                })}
            </ul>
        </div>
    );
};

export default Sidebar;