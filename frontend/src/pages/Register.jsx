import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
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

    const handleChange = e => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", inputs);
            //console.log(inputs)
            console.log(JSON.stringify(err));
            navigate("/login");
        } catch (err) {
            console.log(inputs)
            console.log(err.response.data)
            setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <Typography variant="h2">Register</Typography>
            <form>
                <Input
                    type="text" required T
                    placeholder='First Name'
                    className="app__form-element"
                    name="firstName"
                    onChange={handleChange}
                />
                <Input
                    type="text" required T
                    placeholder='Last Name'
                    className="app__form-element"
                    name="lastName"
                    onChange={handleChange}
                />
                <Input
                    type="text" required T
                    placeholder='Email'
                    className="app__form-element"
                    name="email"
                    onChange={handleChange}
                />
                <Input
                    type="number" required T
                    placeholder='Phone Number'
                    className="app__form-element"
                    name="phoneNumber"
                    onChange={handleChange}
                />
                <Input
                    type="text" required T
                    placeholder='Password'
                    className="app__form-element"
                    name="password"
                    onChange={handleChange}
                />
                <Button variant='outlined' className="app__form-element" sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleSubmit}>Register</Button>
                {err && <p>{err}</p>}
                <span>Already have an account yet? <Link to="/login" style={{textDecoration: 'none', color:"purple"}}><Typography variant="h5">Login</Typography></Link></span>
            </form>
        </div>
    )
}

export default Register