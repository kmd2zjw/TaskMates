import mysql from "mysql"

export const db = mysql.createConnection({
    host: "mysql01.cs.virginia.edu",
    user: "kmd2zjw",
    password: "taskMate4750",
    database:"kmd2zjw"
})

export default db;