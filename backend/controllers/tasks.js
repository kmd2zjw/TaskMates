import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const addTask = (req, res) => {
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
    db.query(q1, [values], (err, data) => {
      if (err) return res.send(err);
      const q2 = "SELECT taskID from task WHERE task_name = ?";
      db.query(q2, [req.body.name], (err1, data1) => {
        if (err1) return res.send(err1);
        const temp = [
          data1[0].taskID,
          req.body.orgId,
        ]
        const q3 = "INSERT INTO group_tasks(`taskID`, `groupID`) VALUES (?)"
        db.query(q3, [temp], (err2, data2) => {
          if (err2) return res.send(err2);
        })
      });

      return res.json("Task has been created");

    });
  });
}

export const getUserTasks = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "SELECT * FROM (task NATURAL JOIN group_tasks NATURAL JOIN organization) INNER JOIN assigned_to ON assigned_to.taskID = task.taskID where userID=?"
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })

  });
}

export const getUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "UPDATE user SET first_name=?, last_name=?, email=?, phone_number=? WHERE userID=? "
    const v = [
      req.body.inputs.firstName,
      req.body.inputs.lastName,
      req.body.inputs.email,
      req.body.inputs.phoneNumber,
      userInfo.id
    ]
    db.query(q, v, (err, data) => {
      console.log(err)
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })

  });
}

export const getGroupTasks = (req, res) => {
  const q =
    "SELECT DISTINCT * FROM (group_tasks NATURAL JOIN task) LEFT JOIN assigned_to ON task.taskID = assigned_to.taskID WHERE groupID = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const getAllGroupTasks = (req, res) =>{
  const q =
  "SELECT * FROM group_tasks NATURAL JOIN task WHERE groupID = ? ";

db.query(q, [req.params.id], (err, data) => {
  if (err) return res.status(500).json(err);
  return res.status(200).json(data);
});
}

export const acceptTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "INSERT INTO assigned_to(`taskID`, `userID`) VALUES (?)"
    const v = [
      req.params.id,
      userInfo.id,
    ]
    // db.query(q, [v], (err, data) => {

    // })
    db.query(q, [v], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Task accepted");
    })

  });
}

export const getTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    const q = "SELECT * FROM task NATURAL JOIN assigned_to WHERE taskID=?"
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })

  });
}

/* Sorted through front-end 

export const getUnclaimedTasks = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    const q = "SELECT * FROM (group_tasks NATURAL JOIN task) LEFT JOIN assigned_to ON task.taskID = assigned_to.taskID WHERE groupID = ? AND userID=null"
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })

  });
}

export const getClaimedTasks = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    const q = "SELECT * FROM group_tasks NATURAL JOIN assigned_to WHERE groupID = ? "
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })

  });
} */

export const deleteTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err1, userInfo) => {
    const q1 = "DELETE FROM task WHERE taskID=?"
    db.query(q1, [req.params.id], (err, data) => {
      if (err1) return res.status(500).json(err);
      const q2 = "DELETE FROM assigned_to WHERE taskID=?"
      db.query(q2, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        const q3 = "DELETE FROM group_tasks WHERE taskID=?"
        db.query(q3, [req.params.id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Task deleted");;
        })

      })
    })

  });
}