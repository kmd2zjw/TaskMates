import React from "react";
import {Link} from "react-router-dom";
//import './Login.scss';
const Login = () => {
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="email" placeholder='Email' />
                <input required type="password" placeholder='Password' />
                <button>Login</button>
                <p>Failed to login!</p>
                <span>Don't have an account yet? <Link to ="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login