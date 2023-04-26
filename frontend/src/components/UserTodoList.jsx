import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const OrgTiles = () => {
  const [tasks, setTasks] = useState([]);

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
      <Typography variant="h3">Your TODO List: </Typography>
      {tasks.map((task) => (
        <div className="app__org" key={task.taskID}>
          <Typography variant="h4">{task.task_name}</Typography>
          <Link className="link" to={`/orgs/${task.groupID}`}>
            <Button variant="outlined" sx={{ color: '#212121', borderColor: '#212121' }} className="app__section-element">
              <Typography variant="h4">Click here</Typography>
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default OrgTiles