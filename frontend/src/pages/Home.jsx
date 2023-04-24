import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {Navbar} from "../components"

const Home = () => {
    const [err, setError] = useState(null);
    //const navigate = useNavigate();
    // const [posts, setOrgs] = useState([]);

    // const getText = (html) =>{
    //     const doc = new DOMParser().parseFromString(html, "text/html")
    //     return doc.body.textContent
    // }
    
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await axios.get(`/posts${cat}`);
    //         setOrgs(res.data);
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     };
    //     fetchData();
    //   }, [cat]);

    return (
        <div>
            <Navbar></Navbar>
            <button className="createOrg">
                Create an Organization! 
                <Link to="./createorg">Click Here</Link>
            </button>
            
        </div>

    )
}

export default Home