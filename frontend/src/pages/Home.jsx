import React, {useContext, useState} from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {Navbar} from "../components"
import {AuthContext} from "../context/authContext"
import Button from "@mui/material/Button";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import image from "../img/4907157.jpg"

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
        <Box>
            <Navbar></Navbar>
            <Toolbar />
            {/* <div className="orgs">
                {orgs.map((org) => (
                    <div className="org" key={org.groupId}>
                        <div>title</div>
                    </div>
                ))}
            </div> */}
            <Box style={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                minHeight:"80vh",
            }}>
                <Link to="./createorg">
                <Button variant="outlined" className="createOrg">
                        <Typography>
                            Create Organization
                        </Typography>
                </Button>
                </Link>
            </Box>
        </Box>

    )
}

export default Home