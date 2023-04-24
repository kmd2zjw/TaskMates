import express from "express";
import mysql from "mysql";
import db from "./db.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js"
import orgRoutes from "./routes/orgs.js";


const app = express()

app.use(express.json())
app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/orgs", orgRoutes)

app.listen(8800, ()=> {
    console.log("Connected!")
})