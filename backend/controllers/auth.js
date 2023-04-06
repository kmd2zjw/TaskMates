import {db} from "../db.js"
import bcrypt from "bcryptjs"

export const register = (req, res) => {

    //CHECK EXISTING USER
  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) {console.log(err.message);return res.status(500).json(err);}
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user(`first_name`, `last_name`,`email`,`phone_number`, `password`) VALUES (?)";
    const values = [req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber,  hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
}

export const login = (req, res) => {

}

export const logout = (req, res) => {

}