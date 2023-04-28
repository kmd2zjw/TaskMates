import React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { AppWrap } from '../wrapper';
import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Profile = () => {

    const { currentUser, logout } = useContext(AuthContext);

    const [orgs, setOrgs] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/orgs/`);
                setOrgs(res.data);
                const res2 = await axios.get(`/tasks/getUserTasks`);

                setTasks(res2.data);


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
        <Box className="app__container" style={{ justifyContent: "flex-start" }}>
            {currentUser ? (
                <div className="title-section">
                    <Typography variant="h2" style={{ paddingBottom: '0rem' }} className="title-text app__profile-element">{currentUser?.first_name} {currentUser?.last_name}</Typography>
                    <Typography variant="h6">User ID: {currentUser?.userID}</Typography>
                </div>
            ) : (
                <Typography variant="h2">Please login in order to view profile</Typography>
            )}

            {currentUser ? (
                <div>
                    <Typography variant="h4" className="app__profile-element"><u>Upcoming Tasks: </u></Typography>
                    <div className="app__org-menu">
                        <ul>
                        {tasks.map((task) => (
                            <a href={`./${task.groupID}/task/${task.taskID}`} className="link" key={task.taskID}>
                            <li>
                                <Typography variant="h5" className="app__org">{task.task_name} for {task.groupName}, due {printDate(task.due_date)}</Typography>
                            </li>
                            </a>
                        ))}
                        </ul>
                    </div>

                    <Typography variant="h4" className="app__profile-element"><u>Currently Involved Organizations: </u></Typography>
                    <div className="app__profile-org-menu">
                        {orgs.map((org) => (
                            <div>
                            <a href={`/orgs/${org.groupID}`}  className="app__org link">
                                <Typography style={{color: 'black'}} variant="h4" className="app__profile-org"> {org.groupName}, </Typography>
                            </a>
                            </div>
                        ))}
                    </div>


                    <Typography variant="h4" className="app__profile-element"><u>Email:</u> {currentUser?.email}</Typography>

                    <Typography variant="h4" className="app__profile-element"><u>Phone Number:</u> {currentUser?.phone_number}</Typography>

                    <div className="centerElements">
                        <Button variant="outlined" sx={{ color: '#212121', borderColor: '#212121' }} className="app__section-element" onClick={logout}>
                            <Typography>Logout</Typography>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="centerElements">
                    <Typography variant="h5" className="app__section-element">*Login using the Login button in the Navbar or the button below</Typography>
                    <Link className="link app__section-element" to="/login">
                        <Button variant="outlined" sx={{ color: '#212121', borderColor: '#212121' }} className="app__section-element">
                            <Typography>Login</Typography>
                        </Button>
                    </Link>
                </div>
            )}

        </Box>
    )
}

export default AppWrap(Profile, "Profile");