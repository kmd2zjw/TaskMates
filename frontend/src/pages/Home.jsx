import React, {useContext, useState} from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext"
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import image from "../img/4907157.jpg";
import { AppWrap } from '../wrapper';
import OrgTiles from "../components/OrgTiles"
import UserTodoList from "../components/UserTodoList"

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
        <Box className="homepage">
            {/* <div className="orgs">
                {orgs.map((org) => (
                    <div className="org" key={org.groupId}>
                        <div>title</div>
                    </div>
                ))}
            </div> */}
            <UserTodoList className="app__element"></UserTodoList>
            <OrgTiles className="app__element"/>
            <Box className="app__container">
                
            </Box>
        </Box>

    )
}

export default AppWrap(Home, "Home");
