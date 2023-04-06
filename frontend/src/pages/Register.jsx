import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text"
                       placeholder='First Name'
                       name="firstName"
                       onChange={handleChange}
                />
                <input required type="text"
                       placeholder='Last Name'
                       name="lastName"
                       onChange={handleChange}
                />
                <input required type="email"
                       placeholder='Email'
                       name="email"
                       onChange={handleChange}
                />
                <input required type="number"
                       placeholder='Phone Number'
                       name="phoneNumber"
                       onChange={handleChange}
                />
                <input required type="password"
                       placeholder='Password'
                       name="password"
                       onChange={handleChange}
                />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>Already have an account yet? <Link to ="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register