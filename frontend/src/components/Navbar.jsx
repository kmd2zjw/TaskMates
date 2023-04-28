import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/authContext"
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Task';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        <Box sx={{ flexGrow: 1}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed" sx={{color: ''}}>
                    <Toolbar variant="dense">
                        <Box sx={{marginRight: "auto", display: 'flex', flexDirection: 'row',  justifyContent: "flex-end"}}>
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <TaskIcon />
                            </IconButton>

                            <Link to="../" className="app__button-text" style={{color: 'white'}}>
                                <Button sx={{ color: '#fff' }}>
                                    <Typography  variant="h6" color="inherit" component="div">
                                        TaskMates
                                    </Typography>
                                </Button>
                            </Link>
                        </Box>
                        <Box style={{margin: 'auto'}}>
                            {currentUser ? (
                                <Typography>Welcome to TaskMates, {currentUser?.first_name}!</Typography>
                            ) : (
                                <Typography>Welcome to TaskMates!</Typography>
                            )}
                        </Box>
                        <Box sx={{marginLeft: "auto", display: 'flex', flexDirection: 'row'}}>
                                    <Link to ="/profile">
                                        <Button sx={{ color: '#fff' }}>
                                        <Typography>Profile</Typography>
                                        </Button>
                                    </Link>

                                {currentUser ? (
                                    <Button sx={{ color: '#fff' }} onClick={logout}>
                                        <Typography>Logout</Typography>
                                    </Button>
                                ) : (
                                        <Link className="link" to="/login">
                                            <Button sx={{ color: '#fff' }}>
                                            <Typography>Login</Typography>
                                            </Button>
                                        </Link>
                                )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    )
}

export default Navbar