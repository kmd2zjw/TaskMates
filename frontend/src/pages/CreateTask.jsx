import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {Navbar} from "../components";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import image from "../img/4907157.jpg";

const CreateTask = () => {
    const state = useLocation().state;
    const [name, setName] = useState(state?.name || "");
    const [description, setDescription] = useState(state?.description || "");
    const [dueDate, setDueDate] = useState(new Date());
    const handleClick = async (e) => {
        //TODO
        console.log(name);
        console.log(description);
    };

    return (
        <Box>
            <Navbar></Navbar>
            <Toolbar />
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

                    <Box sx={{pt: 2}} className="button">
                        <Button variant='outlined' sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleClick}>Create Task</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )

}

export default CreateTask