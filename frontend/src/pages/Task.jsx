import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppWrap } from '../wrapper';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import moment from "moment"

const Task = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [task, setTask] = useState([]);

    const orgId = location.pathname.split("/")[2];
    const taskId = location.pathname.split("/")[4];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/tasks/getTask/${taskId}`);
            setTask(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [taskId]);

    
    const handleAccept = async ()=>{
      try {
        await axios.post(`/tasks/accept/${taskId}`);
        navigate(`/orgs/${orgId}`)
      } catch (err) {
        console.log(err);
        alert("Task is already taken")
      }
    }
    const handleDelete = async ()=>{
        try {
          await axios.delete(`/tasks/${taskId}`);
          navigate(`/orgs/${orgId}`)
        } catch (err) {
          console.log(err);
        }
      }
    return (
        <div>
            {task.map((t) => (
            <div key={t.taskID}> 
                <h1>Task: {t.task_name}</h1>
                <label>Due on: {t.due_date}</label>
                <span>description: {t.description}</span>
                <button onClick={handleAccept}>Accept?</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            ))}


        </div>
            
    )
}

export default AppWrap(Task, "Task");