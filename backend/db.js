import mysql from "mysql"

export const db = mysql.createConnection({
    host: "portal.cs.virginia.edu",
    port: "22",
    user: "as7nj",
    password: "Password@1",
    database:"as7nj"
})

export default db;