import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Organizations = () => {
    const [org, setOrg] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
  
    const orgId = location.pathname.split("/")[2];
  
    const { currentUser } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/orgs/${orgId}`);
          setOrg(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [orgId]);

    return (
        <div>Organizations
            This is org page. {orgId}
        </div>
    )
}

export default Organizations