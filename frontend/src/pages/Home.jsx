import React, {useContext, useState} from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {Navbar} from "../components"
import {AuthContext} from "../context/authContext"
import {Button} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {AppWrap} from '../Wrapper';

const Home = () => {
    const [err, setError] = useState(null);
    const [orgs, setOrgs] = useState([]);
    const { currentUser, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/");
                setOrgs(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentUser]);
    //console.log(currentUser.id)

    return (
        <div>
            <h2 className="title-text">Plan Tasks Smarter</h2>
            {/* <div className="orgs">
                {orgs.map((org) => (
                    <div className="org" key={org.groupId}>
                        <div>title</div>
                    </div>
                ))}
            </div> */}
            <div className="app__buttons">
            <Link to="./createorg">
            <button className="app__button">
                <div className="app__button-text">Create an Organization</div>
            </button>
            </Link>
            </div>

        </div>

    )
}

export default AppWrap(Home, 'home');