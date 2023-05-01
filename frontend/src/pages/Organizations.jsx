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
  const [members, setMembers] = useState([]);
  const [filterTasks, setFilterTask] = useState([]);
  const [unfiltered, setUnfiltered] = useState(true);
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
        const groupUsers = await axios.get(`/orgs/${orgId}/getUsers`);
        setMembers(groupUsers.data);
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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
    if(e.target.id === "all"){
      setFilterTask(tasks);
    } else if(e.target.id === "claimed"){
      setFilterTask(tasks.filter((task) => task.userID != null));
    } else if(e.target.id === "unclaimed"){
      setFilterTask(tasks.filter((task) => task.userID == null));
    }
  }


  const readFile = async (e) => { 
    e.preventDefault() 
    const reader = new FileReader() 
    reader.onload = async (e) => { 
       const text = (e.target.result) 
       var result = text.split(",").map(function (value) {
        return value.trim();
      });
       let i = 0
       for (i in result) {
        let userAdd = result[i]
        try {
          await axios.post(`/orgs/${orgId}/addUserToGroup`, {
            userAdd, orgId,
          })
        } catch (err) {
          console.log(err);
        }
       }
    }; 
    window.location.reload();
    reader.readAsText(e.target.files[0]) 
  }

  const handleMakeAdmin = async (userID) => {
    console.log(orgId)
    try {
      await axios.post(`/orgs/${orgId}/makeAdmin`, {
        'groupID': orgId,
        'userID': userID
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="orgPage">
      <Typography variant='h2' style={{fontWeight: 700}}><u>{org.groupName}</u></Typography>
      <form className="addUserForm" style={{ marginTop: '24px' }}>
        <Input
            type="text" required
            placeholder='User ID'
            onChange={(e) => setUser(e.target.value)}
        />
        <Button
          variant='outlined' sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleClick}>Add Member
        </Button>
        
      </form>
      <div className = "centerElements">
        <div>
       Upload Users: <input type="file" placeholder="Upload Users" onChange={(e) => readFile(e)} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '100px' }}>
        <div style={{ flex: '1' }}>
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
                <h4 style={{fontWeight: 'normal'}}>{task.description}</h4>
                <h4 style={{fontWeight: 'normal'}}>Due: {printDate(task.due_date)}</h4>              
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
        <div style={{ flex: '1' }}>
          <div style={{display: 'flex', alignItems: 'center', margin: '14px 0'}}>
            <h2>Members</h2>
            <h2 style ={{paddingLeft: 30}}>Click to make Admin</h2>
          </div>

          <div className="members" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {members.map((member) => (
            <div key={member.userID} onClick={ () => handleMakeAdmin(member.userID) } style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', width: '150px', borderRadius: '16px', backgroundColor: 'white', boxSizing: 'border-box', boxShadow: '0 2px 4px 0px lightgray', backgroundColor: member.adminID ? 'rgb(255, 251, 237)' : 'white' }}>
              <div style={{ height: '46px', width: '46px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: '16px', border: '1.5px solid cornflowerblue', marginBottom: '4px', marginTop: '-4px' }}>
                <span>{ member.first_name[0] }{ member.last_name[0] }</span>
              </div>
              <h3 style={{ textAlign: 'center', marginTop: '2px' }}>{ member.first_name } { member.last_name }</h3>
            </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default AppWrap(Organizations, "Organizations");