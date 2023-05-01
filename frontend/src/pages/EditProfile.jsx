
import { AppWrap } from '../wrapper';
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";

const EditProfile = () => {

    const location = useLocation();
    const userID = location.pathname.split("/")[2];

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleChange = e => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        //console.log(inputs)
    };


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/getUser`, {inputs} );
            //console.log(inputs)
            navigate("/profile");
        } catch (err) {
            console.log(inputs)
            console.log(err.response.data)
            setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <Typography variant="h2">Edit Profile</Typography>
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
                <Button variant='outlined' className="app__form-element" sx={{ color: '#212121', borderColor: '#212121' }} onClick={handleSubmit}>Confirm Changes</Button>
            </form>
        </div>
    )
}

export default AppWrap(EditProfile, "EditProfile");