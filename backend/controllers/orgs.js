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
        req.body.userID,
      ];
      let groupID = '';
      const q1 = "INSERT INTO in_group(`userID`, `groupID`) VALUES (?)"
      const q2 = "SELECT groupID from organization where groupName = ?";
      const q3 = "INSERT INTO make_admin(`userID`, )"

      db.query(q, [values], (err, data1) => {
        if (err) return res.status(500).json(err);
        db.query(q2, [values], (err1, data2) => {
          if (err1) return res.status(500).json(err1);
          console.log(data2[0].groupID);
          console.log(userInfo.id);
          const inGroup = [
              req.body.userID,
              data2[0].groupID,
          ];
          db.query(q1, [inGroup], (err2, data3) => {
              if (err2) return res.status(500).json(err2)
          })
          
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