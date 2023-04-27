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
  });

  return (
    <div className="app__org-menu">
      <Typography variant="h3">Orgs you're apart of: </Typography>
      {orgs.map((org) => (
        <div className="app__org" key={org.groupID}>
          <Typography variant="h4">{org.groupName}</Typography>
          <Link className="link" to={`/orgs/${org.groupID}`}>
            <Button variant="outlined" sx={{ color: '#212121', borderColor: '#212121' }} className="app__section-element">
              <Typography variant="h5">Click here to View</Typography>
            </Button>
          </Link>
        </div>
      ))}
      <Link to="./createorg">
                    <Button variant="outlined" sx={{ color: '#212121', borderColor: '#212121' }} className="app__section-element">
                            <Typography>
                                Create Organization
                            </Typography>
                    </Button>
                </Link>
    </div>
  );
}

export default OrgTiles