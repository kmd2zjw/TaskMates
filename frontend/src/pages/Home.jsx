import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    return (
        <div>HomePage
            <button className="createOrg">
                Create an Organization! 
                <Link to="./createorg">Click Here</Link>
            </button>
        </div>

    )
}

export default Home