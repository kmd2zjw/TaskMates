import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const UserTodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tasks/getUserTasks`);
        
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const printDate = (dateString) => {
    return new Date(dateString).toLocaleString();
}

  return (
    <div className="UserTodoList">
      <Typography variant="h3">Your TODO List: </Typography>
      {tasks.map((task) => (
        <Typography  className="todoTask" key={task.taskID}>
          <Typography  className="name">  <u>{task.task_name}</u> </Typography >
          <Typography  className="name">  Due: {printDate(task.due_date)} </Typography >
          <Typography  className="name">  Description: {task.description} </Typography >
        </Typography >
      ))}
    </div>
  );
}

export default UserTodoList;