import {db} from "../db.js"

export const register = (req, res) => {

    //CHECK EXISTING USER
    const q = "Select * FROM user WHERE email = ?"

    db.query(q, [req.body.email], (err,data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const q = "INSERT INTO user(`first_name`, `last_name`, )"


    });
}

export const login = (req, res) => {

}

export const logout = (req, res) => {

}