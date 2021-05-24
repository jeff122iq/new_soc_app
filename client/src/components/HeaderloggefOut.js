import React, {useState} from 'react';
import Container from "./Container"
import "../styles/header.css"
import {Link} from "react-router-dom"
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';


const navMenu = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Contacts",
        link: "/contacts"
    },
]

const authMenu = [
    {
        name: "Log-in",
        link: "/login"
    },

    {
        name: "Register",
        link: "/register"
    },
]

const adaptiveMenu = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Contacts",
        link: "/contacts"
    },
    {
        name: "Log-in",
        link: "/login"
    },

    {
        name: "Register",
        link: "/register"
    },
]

const HeaderloggefOut = () => {
    const [open, setOpen] = useState(false)

    const openMenu = () => {
        setOpen(true)
    }

    const closeMenu = () => {
        setOpen(!open)
    }

    return (
        <header className="header">
                <div
                    className={open ? "adaptiveMenu" : "closeMenu"}
                    onClick={closeMenu}
                >
                    <ul>
                        <h1>LOGO</h1>
                        {adaptiveMenu.map((item, idx) => {
                            return (
                                <Link key={idx} to={item.link}>{item.name}</Link>
                            )
                        })}
                    </ul>
                </div>
            <Container>
                <h1>LOGO</h1>
                <ul>
                    {navMenu.map((item, idx) => {
                        return (
                            <Link key={idx} to={item.link}>{item.name}</Link>
                        )
                    })}
                </ul>
                <ul>
                    {authMenu.map((item, idx) => {
                        return (
                            <Link key={idx} to={item.link}>{item.name}</Link>
                        )
                    })}
                </ul>
                <Fab
                    className={"fab"}
                    onClick={openMenu}
                >
                    <MenuIcon className={"menuIcon"}/>
                </Fab>
            </Container>
        </header>
    );
};

export default HeaderloggefOut