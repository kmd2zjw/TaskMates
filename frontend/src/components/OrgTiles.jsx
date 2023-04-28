import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const OrgTiles = () => {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/orgs/`);
        setOrgs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app__org-menu">
      <Typography variant="h3">Your Organizations </Typography>
      <div className="app__org-container">
        {orgs.map((org) => (
          <a href={`/orgs/${org.groupID}`} className="app__org">
            <Typography variant="h5">{org.groupName}</Typography>
          </a>
        ))}
        <a href={`./createorg`} className="app__org">
          <div><Typography variant="h5">+</Typography></div>
          <Typography variant="h5">New</Typography>
        </a>
      </div>
    </div>
  );
}

export default OrgTiles