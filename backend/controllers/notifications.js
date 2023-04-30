import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getUserNotifications = (req, res) =>{
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM notification NATURAL JOIN notify_user INNER JOIN task ON task.taskID=notify_user.taskID where assigner_userID=?"
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })
  });
}