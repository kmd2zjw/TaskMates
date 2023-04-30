import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

import { Home, Login, Profile, Register, Organizations, CreateOrg, CreateTask, Task } from './pages';
import { Footer, Navbar } from './components';
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
    children: [
      {
        path:"/",
        element: <Login/>
      },
      {
        path:"/home",
        element: <Home/>
      },
    ]
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
    path: "/orgs/:id",
    element: <Organizations/>,
  },
  {
    path: "/createorg",
    element: <CreateOrg/>,
  },
  {
    path: "/orgs/:id/createtask",
    element: <CreateTask/>
  },
  {
    path: "/orgs/:id/task/:tid",
    element: <Task/>
  }
]);


function App() {
  return (
    <div className="app">
      <RouterProvider router = {router}/>
    </div>
  );
}



export default App;
