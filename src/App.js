import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import { Home, Login, Profile, Register } from './pages';
import { Footer, Navbar } from './components';
import './App.scss';

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
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
    path: "/login",
    element: <Login/>,
  },
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
