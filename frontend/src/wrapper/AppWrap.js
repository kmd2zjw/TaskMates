import React from 'react';
import { Navbar } from "../components";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const AppWrap = (Component, idName) => function HOC() {
    return (
        <>
            <Box id={idName}>
                <Navbar />
                <Toolbar />
                <Component/>
            </Box>
        </>
    )
}

export default AppWrap;