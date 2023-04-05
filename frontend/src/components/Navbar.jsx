import React from "react";
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">logo</div>
                <div className="links">
                    <Link className="link" to ="/profile">
                        <h4>Profile</h4>
                    </Link>
                    <span>Username</span>
                    <span>
                        <Link to="./login">LogOut</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar