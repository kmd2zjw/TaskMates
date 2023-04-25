import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style.scss'
import { AuthContext } from "../context/authContext";

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
            <h1 className="title-text">Login</h1>
            <form>
                <input  
                    required
                    type="text"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                />
                <input 
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <p>Failed to login!</p>
                <span>Don't have an account yet? <Link to ="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login;