import React, {useEffect, useState} from 'react';
import "../styles/sideBar.css"
import {NavLink} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
    Home,
    Email,
    PostAdd,
    PeopleAlt,
    Person
} from '@material-ui/icons';

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
            link: "/home",
            icon: <Home/>
        },
        {
            name: "My page",
            link: `/mypage/${decode.username}`,
            icon: <Person/>
        },
        {
            name: "Messages",
            link: "/messages",
            icon: <Email/>
        },
        {
            name: "Subscribers",
            link: "/subscribers",
            icon: <PostAdd/>
        }
    ]


    return (
        <div className="sideBar">
            <ul>
                {sidebarMenu.map((item, idx) => {
                    return (
                        <NavLink key={idx} to={item.link}>
                            {item.icon}
                            {item.name}
                        </NavLink>
                    )
                })}
            </ul>
        </div>
    );
};

export default Sidebar;