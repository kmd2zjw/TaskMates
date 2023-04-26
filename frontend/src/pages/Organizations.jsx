import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import moment from "moment"

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
      console.log(org)
    }, [orgId]);

    return (
        <div>Organizations
            This is org page.
            <div> GroupID: {org.groupID}</div>
            <div> GroupName: {org.groupName}</div>
            <Link to="./createtask">
                click here to make a task
            </Link>
            <h1>GROUP TASKS:</h1>
            {tasks.map((task) => (
            <div className="org" key={task.taskID}>
              <h2>Title: {task.task_name}</h2>
              <h4>Description: {task.description}</h4>
              <h4>Due on: {task.due_date}</h4>
            </div>
            ))}

        </div>

    )
}

export default Organizations