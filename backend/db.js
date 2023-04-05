import mysql from "mysql"

export const db = mysql.createConnection({
    host:"http://mysql01.cs.virginia.edu/phpmyadmin/index.php?route=/database/sql&db=kmd2zjw",
    user: "kmd2zjw",
    password: "taskMate4750",
    database:"kmd2zjw"

})