const mysql = require("mysql");


// Skaber forbindelse til database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cases"
    });


module.exports = connection; // eksporterer forbindelse