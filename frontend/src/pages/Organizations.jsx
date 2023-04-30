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
    const [userAdd, setUser] = useState([]);

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

    const handleClick = async (e) => {
      e.preventDefault();
  
      try {

        await axios.post(`/orgs/${orgId}/addUserToGroup`, {
              userAdd, orgId,
            })
          navigate(`/orgs/${orgId}`)
      } catch (err) {
        console.log(err);
      }
  };


    const downloadTasks = () => {
      const texts = []
      tasks.map((task) => {
        texts.push("Task ID: " + task.taskID + "\n")
        texts.push("Task name: " + task.task_name + "\n")
        texts.push("Task Due Date: " + task.due_date + "\n")
        texts.push("Task description: " + task.description + "\n\n")
      })
      const file = new Blob(texts, {type: 'text/plain'})
      const element = document.createElement("a")
      element.href = URL.createObjectURL(file)
      element.download = "tasks" + Date.now() + ".txt"
      document.body.appendChild(element);
      element.click()
    }

    const printDate = (dateString) => {
      return new Date(dateString).toLocaleString();
  }

    return (
      <div className="orgPage">
        <Typography variant='h2' style={{fontWeight: 700}}><u>{org.groupName}</u></Typography>
        
        <div style={{ display: 'flex', gap: '100px' }}>
          <div style={{ flex: '1' }}>
            <div className="centerElements">
              <Typography variant='h3'>Tasks</Typography>
              <Link to="./createtask">
                <Button variant='outlined' className="app_task">New Task</Button>
              </Link>
              <Button variant='outlined' className="app_task" onClick={downloadTasks}>Download Tasks</Button>
    
              <div>
                <Button variant='outlined' className="app_task" onClick={downloadTasks}>Show All Tasks</Button>
                <Button variant='outlined' className="app_task" onClick={downloadTasks}>Show Claimed Tasks</Button>
                <Button variant='outlined' className="app_task" onClick={downloadTasks}>Show Unclaimed Tasks</Button>
              </div>
            </div>
            
            <div className="tasks">
              {tasks.map((task) => (
              <a href={`./${orgId}/task/${task.taskID}`} className="task" key={task.taskID}>
                <h2>{task.task_name}</h2>
                <h4 style={{fontWeight: 'normal'}}>{task.description}</h4>
                <h4 style={{fontWeight: 'normal'}}>Due: {printDate(task.due_date)}</h4>              
              </a>
              ))}
            </div>
            <form>
              <Input
                  type="text" required T
                  placeholder='User ID'
                  onChange={(e) => setUser(e.target.value)}
              />
              <Button
                variant='outlined' sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleClick}>Add User
              </Button>
            </form>
          </div>

          <div style={{ flex: '1' }}>
            <div style={{display: 'flex', alignItems: 'center', margin: '14px 0'}}>
              <h2>Members</h2>
            </div>
            
            <div className="members" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {tasks.map((task, idx) => (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', width: '150px', borderRadius: '16px', backgroundColor: 'white', boxSizing: 'border-box', boxShadow: '0 2px 4px 0px lightgray' }}>
                <div style={{ height: '46px', width: '46px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: '16px', border: '1.5px solid cornflowerblue', marginBottom: '4px', marginTop: '-4px' }}>
                  <span>P{ idx }</span>
                </div>
                <h3 style={{ textAlign: 'center' }}>Person { idx }</h3>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

export default AppWrap(Organizations, "Organizations");