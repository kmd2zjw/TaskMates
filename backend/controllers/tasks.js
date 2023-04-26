import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const addTask = (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const values = [
        userInfo.id,
        req.body.date,
        req.body.description,
        req.body.name,
      ]
      const q1 = "INSERT INTO task(`assigner_userID`, `due_date`, `description`, `task_name`) VALUES (?)";
      db.query(q1, [values], (err,data)=>{
          if(err) return res.send(err);
          const q2 = "SELECT taskID from task WHERE task_name = ?";
          db.query(q2, [req.body.name], (err1,data1)=>{
            if(err1) return res.send(err1);
            const temp = [
                data1[0].taskID,
                req.body.orgId,
            ]
            const q3 = "INSERT INTO group_tasks(`taskID`, `groupID`) VALUES (?)"
            db.query(q3, [temp], (err2, data2)=> {
                if(err2) return res.send(err2);
            })
          });

          return res.json("Task has been created");
          
      });
    });
}