import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

import { Home, Login, Profile, Register, Organizations, CreateOrg, } from './pages';
import { Footer, Navbar } from './components';
import Toolbar from '@mui/material/Toolbar';
import './style.scss';
/*
const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    /*children: [
      {
        path:"/",
        element: <Login/>
      },
      {
        path:"/home",
        element: <Home/>
      },
    ]*/
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path:"/home",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/organizations",
    element: <Organizations/>,
  },
  {
    path: "/createorg",
    element: <CreateOrg/>,
  }
]);


function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router = {router}/>
      </div>
    </div>
  );
}



export default App;
