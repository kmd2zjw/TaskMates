import React from 'react';
import {Navbar} from '../components';
import Toolbar from '@mui/material/Toolbar';

const AppWrap = (Component, idName) => function HOC() {
    return (
        <>
            <div id={idName} >
                <Navbar/>
                <Toolbar/>
                <Component/>
            </div>
        </>
    )
}

export default AppWrap;