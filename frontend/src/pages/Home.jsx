import React, {useContext, useState} from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {Navbar} from "../components"
import {AuthContext} from "../context/authContext"

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
            <Navbar></Navbar>
            {/* <div className="orgs">
                {orgs.map((org) => (
                    <div className="org" key={org.groupId}>
                        <div>title</div>
                    </div>
                ))}
            </div> */}
            <button className="createOrg">
                Create an Organization! 
                <Link to="./createorg">Click Here</Link>
            </button>
            
        </div>

    )
}

export default Home