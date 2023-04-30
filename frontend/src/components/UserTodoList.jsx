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
  });

  return (
    <div className="UserTodoList">
      <Typography variant="h3">Your TODO List: </Typography>
      {tasks.map((task) => (
        <div className="todoTask" key={task.taskID}>
          <div className="name">  {task.task_name} </div>
          <div className="name">  {task.due_date} </div>
          <div className="name">  {task.description} </div>
        </div>
      ))}
    </div>
  );
}

export default UserTodoList;