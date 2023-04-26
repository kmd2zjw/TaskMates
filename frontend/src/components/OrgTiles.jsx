import React, {useContext, useState} from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

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
        <div className="menu">
          <h1>Orgs you're apart of: </h1>
          {orgs.map((org) => (
            <div className="org" key={org.groupID}>
              <h2>{org.groupName}</h2>
              <Link className="link" to={`/orgs/${org.groupID}`}>
                <h2>Click here</h2>
              </Link>
            </div>
          ))}
        </div>
    );
}

export default OrgTiles