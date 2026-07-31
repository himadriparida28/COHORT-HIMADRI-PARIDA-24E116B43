const {query} = require('../models/connections.js');
const initDatabase=async()=>{
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Users_new (
            id SERIAL ,
            username VARCHAR(50) UNIQUE NOT NULL,
            registration_no CHAR(10) UNIQUE NOT NULL,
            password VARCHAR(255) CHECK (length(password) > 8) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age INT  CHECK (age BETWEEN 16 AND 65) NOT NULL,
            PRIMARY KEY (id, registration_no)
            
        );
        ` 
try {
    await query(createTableQuery);
    console.log("Table is created Successfully");
} catch (error) {
    console.log(error);
    process.exit(1);
}
}
module.exports = {
    initDatabase
}