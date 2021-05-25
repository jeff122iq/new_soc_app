import React from 'react';
import "../styles/sideBar.css"
import {NavLink} from "react-router-dom";

const sidebarMenu = [
    {
        name: "Home",
        link: "/home"
    },
    {
        name: "My page",
        link: "/mypage"
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

const Sidebar = () => {
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