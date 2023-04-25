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


const CreateOrg = () => {
    const state = useLocation().state;
    console.log(state)
    const [name, setName] = useState(state?.name || "");

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          // state
            /*?*/ await axios.post(`/orgs/create`, {
                name,
              })
            // : await axios.post(`/org/create`, {
            //     name,
            //   });
            navigate("/")
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <Box component="div" style={{
            backgroundImage:`url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}
             sx={{
                 overflow:'hidden',
                 height: '100vh',
                 width: '100vw',
                 m: '0px'
             }}>
            <Navbar></Navbar>
            <Toolbar />
            <Box style={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                minHeight:"80vh",
                flexDirection:'column',
                overflow: "hidden",
            }}>

                <Typography  variant="h4">Create a New Organization</Typography>
                <form>
                    <Box sx={{pt: 2}}>
                        <Input
                            type="text" required T
                            placeholder='Organization Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                <Box sx={{pt: 2}} className="button">
                    <Button variant="outlined" onClick={handleClick}>Create Organization</Button>
                </Box>
                </form>
            </Box>
        </Box>
    )
}

export default CreateOrg