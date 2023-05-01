import { db } from "../db.js"
import jwt from "jsonwebtoken";

setInterval(function() {
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const q = "SELECT * FROM task"
  
  if (today.getHours() == 10 && today.getMinutes() == 30) { // Time is 10:30am
    db.query(q, [], (err, data) => {
      data.forEach(el => {
        let due = new Date(el.due_date);
        let msg = "";
        if (tomorrow.getFullYear() == due.getFullYear() && tomorrow.getMonth() == due.getMonth() && tomorrow.getDate() == due.getDate()) {
          msg = "Task due tomorrow"
        }
        else if (due < today) {
          msg = "Task is past due"
        }
        const addNotification = "INSERT INTO notification (message) VALUES (?); INSERT INTO notify_user VALUES (LAST_INSERT_ID(), ?)";
        db.query(addNotification, [msg, el.taskID], (err2, data2) => {})
      })
    })
  }
}, 60000);

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