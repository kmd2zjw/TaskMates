import React, {useState, useContext} from "react";
import {AuthContext} from "../context/authContext"

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppWrap } from '../wrapper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import image from "../img/4907157.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"


const CreateTask = () => {
    const state = useLocation().state;
    const [name, setName] = useState(state?.name || "");
    const [description, setDescription] = useState(state?.description || "");
    const [dueDate, setDueDate] = useState(new Date());
    const { currentUser } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const orgId = location.pathname.split("/")[2];
    
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/tasks/addTask`, {
                name, description, date: moment(dueDate).format("YYYY-MM-DD HH:mm:ss"), orgId,
              })
            navigate(`/orgs/${orgId}`)
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div>
        {currentUser ? (
        <Box>
            <Box style={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                minHeight:"80vh",
                flexDirection:'column',
                overflow: "hidden",
            }}>

                <Typography  variant="h4">Create a New Task</Typography>
                <form>
                    <Box sx={{pt: 8}}>
                        <Input
                            type="text" required T
                            placeholder='Task Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{pt: 2}}>
                        <Input
                            type="text" required T
                            placeholder='Task Description'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                    <div>
                    <h4 className="datepicker__title" > Due Date: </h4>
                    <DatePicker
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mmaa"
                        label = "Due Date"
                        selected={dueDate}
                        selectsStart
                        minDate = {Date.now()}
                        onChange={date => setDueDate(date)}
                    /></div>

                    <Box sx={{pt: 2}} className="button">
                        <Button variant='outlined' sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleClick}>Create Task</Button>
                    </Box>
                </form>
            </Box>
        </Box>
        ) : (
            <script>
            {window.location.replace("/login")};
            </script>
        )}
        </div>
    )

}

export default AppWrap(CreateTask, 'CreateTask');