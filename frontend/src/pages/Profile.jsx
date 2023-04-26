import React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { AppWrap } from '../wrapper';

import {useContext} from "react";
import {AuthContext} from "../context/authContext"

const Profile = () => {

    const { currentUser } = useContext(AuthContext);


    return (
        <Box className="app__container" style={{justifyContent: "flex-start"}}>
            {currentUser ? (
                <Typography variant="h2" className="title-text app__profile-element">{currentUser?.first_name} {currentUser?.last_name}</Typography>
            ) : (
                <Typography variant="h2">Please login in order to view profile</Typography>
            )}

                {currentUser ? (
                    <div>
                    <Typography variant="h4" className="app__profile-element">Currently Involved orgs</Typography>
                    

                    <Typography variant="h4" className="app__profile-element">Email: {currentUser?.email}</Typography>

                    <Typography variant="h4" className="app__profile-element">Phone Number: {currentUser?.phone_number}</Typography>
                    </div>
                ) : (
                    <Typography variant="h5">*Login using the Login button in the Navbar</Typography>
                )}

        </Box>
    )
}

export default AppWrap(Profile, "Profile");