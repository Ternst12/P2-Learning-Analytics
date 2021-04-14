const mysql = require("mysql");

mysql.createPool({
    connectionLimit: 10,
    password: "te072491",
    user: "root",
    database: "cases",
    host: "127.0.0.1",
    port: "3306"
});

let casesdb = {}; 

casesdb.all = () => {
    return new Promise((resolve, reject) =>{ 
            pool.query("Select * FROM cases", (err, results) => {
            if (err) {
            return reject(err);
            }
            return resolve(results);
        });
    });
}

module.exports = casesdb;