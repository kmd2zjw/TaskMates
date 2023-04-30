import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppWrap } from '../wrapper';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import moment from "moment"
import { Button, Typography, Input } from "@mui/material";

const Organizations = () => {
  const [org, setOrg] = useState({});
  const [tasks, setTask] = useState([]);
  const [filterTasks, setFilterTask] = useState([]);
  const [unfiltered, setUnfiltered] = useState(true);

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

  useEffect(() => {
    setFilterTask(tasks);
  }, [])

  const downloadTasks = () => {
    const texts = []
    tasks.map((task) => {
      texts.push("Task ID: " + task.taskID + "\n")
      texts.push("Task name: " + task.task_name + "\n")
      texts.push("Task Due Date: " + task.due_date + "\n")
      texts.push("Task description: " + task.description + "\n\n")
    })
    const file = new Blob(texts, { type: 'text/plain' })
    const element = document.createElement("a")
    element.href = URL.createObjectURL(file)
    element.download = "tasks" + Date.now() + ".txt"
    document.body.appendChild(element);
    element.click()
  }

  const printDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  }

  const reviseTasks = (e) => {
    setUnfiltered(false);
    tasks.sort(function(task1, task2){
      return Number(new Date(task2.due_date)) - Number(new Date(task1.due_date));
    }).reverse();
    console.log(tasks)
    if(e.target.id === "all"){
      setFilterTask(tasks);
    } else if(e.target.id === "claimed"){
      setFilterTask(tasks.filter((task) => task.userID != null));
    } else if(e.target.id === "unclaimed"){
      setFilterTask(tasks.filter((task) => task.userID == null));
    }
  }

  const sortTasks = (e) => {
    
  }

  return (
    <div className="orgPage">
      <Typography variant='h2' style={{ fontWeight: 700 }}><u>{org.groupName}</u></Typography>

      <div className="centerElements">
        <Typography variant='h3'>Tasks</Typography>
        <Link to="./createtask">
          <Button variant='outlined' className="app_task">New Task</Button>
        </Link>
        <Button variant='outlined' className="app_task" onClick={downloadTasks}>Download Tasks</Button>

        <div>
          <Button variant='outlined' className="app_task" name="all" id="all" onClick={reviseTasks}>Show All Tasks (Sorted by Date)</Button>
          <Button variant='outlined' className="app_task" name="claimed" id="claimed" onClick={reviseTasks}>Show Claimed Tasks (Sorted by Date)</Button>
          <Button variant='outlined' className="app_task" name="unclaimed" id="unclaimed" onClick={reviseTasks}>Show Unclaimed Tasks (Sorted by Date)</Button>
        </div>
      </div>

      <div className="tasks">
        {unfiltered ? (
          <>
          {tasks.map((task) => (
            <a href={`./${orgId}/task/${task.taskID}`} className="task" key={task.taskID}>
              <h2>{task.task_name}</h2>
              <h4 style={{ fontWeight: 'normal' }}>{task.description}</h4>
              <h4 style={{ fontWeight: 'normal' }}>Due: {printDate(task.due_date)}</h4>
            </a>
          ))}
          </>
        ) : (
          <>
          {filterTasks.map((task) => (
            <a href={`./${orgId}/task/${task.taskID}`} className="task" key={task.taskID}>
              <h2>{task.task_name}</h2>
              <h4 style={{ fontWeight: 'normal' }}>{task.description}</h4>
              <h4 style={{ fontWeight: 'normal' }}>Due: {printDate(task.due_date)}</h4>
            </a>
          ))}
          </>
        )}
      </div>
    </div>
  )
}

export default AppWrap(Organizations, "Organizations");