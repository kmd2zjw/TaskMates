import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/authContext"
const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);


    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">logo</div>
                <div className="links">
                    <Link className="link" to ="/profile">
                        <h4>Profile</h4>
                    </Link>
                    <span>Hello, {currentUser?.first_name}</span>
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                        ) : (
                        <Link className="link" to="/login">
                        Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar