import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
    
      const { login } = useContext(AuthContext);
    
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(inputs)
          navigate("/");
        } catch (err) {
          setError(err.response.data);
        }
      };

      return (
        <div className="auth">
          <Typography variant="h2">Login</Typography>
          <form>
            <Input
              type="text" required T
              placeholder='Email'
              className="app__form-element"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password" required T
              placeholder="Password"
              name="password"
              className="app__form-element"
              onChange={handleChange}
            />
            <Button variant='outlined' className="app__form-element" sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleSubmit}>Login</Button>
            {err && <p>{err}</p>}
            <span><Typography>
              Don't have an account yet?
            </Typography> <Link to="/register" style={{textDecoration: 'none', color:"purple"}}><Typography variant="h5">Register</Typography></Link></span>
          </form>
        </div>
      )
    }
    

export default Login;