import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const createOrg = (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO organization(`groupName`) VALUES (?)";
  
      const values = [
        req.body.name,
      ];
      const v1 = [
        userInfo.id,
      ]
      const q1 = "INSERT INTO in_group(``) VALUES (?)"
      const q2 = "SELECT groupID from organization where groupName = ?"

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        db.query(q2, req.body.name, (err1, data) => {
          if (err1) return res.status(500).json(err1);
          console.log(data[0])
          
        })
        return res.json("Page has been created.");
      });

    });
  };

export const viewOrgs = (req, res) =>{
    const q = "SELECT * FROM organization";
    db.query(q, (err,data)=>{
        if(err) return res.send(err);
        return res.status(200).json(data);
    });
}