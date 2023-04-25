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
        // <div className="navbar">
        //     <div className="container">
        //         <div className="logo">logo</div>
        //         <div className="links">
        //             <Link className="link" to ="/profile">
        //                 <h4>Profile</h4>
        //             </Link>
        //             <span>Hello, {currentUser?.first_name}</span>
        //             {currentUser ? (
        //                 <span onClick={logout}>Logout</span>
        //                 ) : (
        //                 <Link className="link" to="/login">
        //                 Login
        //                 </Link>
        //             )}
        //         </div>
        //     </div>
        // </div>
        <Box sx={{ flexGrow: 1}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed" sx={{color: ''}}>
                    <Toolbar variant="dense">
                        <Box sx={{marginRight: "auto", display: 'flex', flexDirection: 'row',  justifyContent: "flex-end", alignItems: 'center'}}>
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <TaskIcon />
                            </IconButton>
                            <Link to="../" className="app__button-text" style={{color: 'white'}}>
                            <Typography variant="h6" color="inherit" component="div">
                                TaskMates
                            </Typography>
                            </Link>
                        </Box>
                        <Box style={{margin: 'auto'}}>
                            {currentUser ? (
                                <Typography>{currentUser?.first_name}'s TaskMates Dashboard</Typography>
                            ) : (
                                <Typography>Welcome to TaskMates!</Typography>
                            )}
                        </Box>
                        <Box sx={{marginLeft: "auto", display: 'flex', flexDirection: 'row'}}>
                                    <Link className="link" to ="/profile">
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