const {query} = require('../models/connection.js');
const initDatabase=async()=>{
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
            name VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) CHECK(LENGTH(password) >= 8) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age INT CHECK(age BETWEEN 16 AND 65) NOT NULL,
            registration_number CHAR(10) UNIQUE NOT NULL,
            PRIMARY KEY (name, registration_number)
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