import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppWrap } from '../wrapper';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import moment from "moment"
import { Button } from "@mui/material";

const Organizations = () => {
    const [org, setOrg] = useState({});
    const [tasks, setTask] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
  
    const orgId = location.pathname.split("/")[2];
  
    const { currentUser } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/orgs/${orgId}`);
          setOrg(res.data);
          const res1 = await axios.get(`/tasks/getGroupTasks/${orgId}`);
          setTask(res1.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [orgId]);

    return (
      <div className="orgPage">
        <h1>{org.groupName}</h1>

        <div style={{display: 'flex', alignItems: 'center'}}>
          <h2>Tasks</h2>
          <Link to="./createtask">
            <Button variant='outlined' style={{margin: '14px'}}>New Task</Button>
          </Link>
        </div>
        
        <div className="tasks">
          {tasks.map((task) => (
          <a href={`./task/${task.taskID}`} className="task" key={task.taskID}>
            <h2>{task.task_name}</h2>
            <h4 style={{fontWeight: 'normal'}}>{task.description}</h4>
            <h4 style={{fontWeight: 'normal'}}>Due {task.due_date}</h4>              
          </a>
          ))}
        </div>
      </div>
    )
}

export default AppWrap(Organizations, "Organizations");