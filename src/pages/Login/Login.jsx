import React from "react";
import './Login.scss';
const Login = () => {
    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='username' />
                <input type="password" placeholder='password' />
            </form>
        </div>
    )
}

export default Login