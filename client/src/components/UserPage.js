import React from 'react';
import HeaderLoggedIn from "./HeaderLoggedIn";
import Sidebar from "./Sidebar";
import "../styles/userPage.css"

const UserPage = (props) => {

    return (
        <div>
            <HeaderLoggedIn/>
            <div className="userPageContainer">
                <Sidebar/>
                    <div className="userContent">
                        {props.children}
                    </div>
            </div>
        </div>
    );
};

export default UserPage;