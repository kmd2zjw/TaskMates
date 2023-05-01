import React, {useContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppWrap } from '../wrapper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import {AuthContext} from "../context/authContext"


const CreateOrg = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const state = useLocation().state;
    const [name, setName] = useState(state?.name || "");
    const userID = currentUser.userID;
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          // state
            /*?*/ await axios.post(`/orgs/create`, {
                name, userID,
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
        <div>
        { currentUser ? (
        <Box>
            <Box style={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                minHeight:"80vh",
                flexDirection:'column',
                overflow: "hidden",
            }}>

                <Typography  variant="h4">Create a New Organization</Typography>
                <form>
                    <Box sx={{pt: 8}}>
                        <Input
                            type="text" required T
                            placeholder='Organization Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                <Box sx={{pt: 2}} className="button">
                    <Button variant='outlined' sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleClick}>Create Organization</Button>
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

export default AppWrap(CreateOrg, 'CreateOrg');