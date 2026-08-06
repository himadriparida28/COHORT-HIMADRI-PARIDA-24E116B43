const { query } = require('../models/connection.js');
const initDatabase=async()=>{
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users_2 (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        owner_id INTEGER NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users_2(id)
    );

    CREATE TABLE IF NOT EXISTS project_members (
        project_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        role VARCHAR(20) DEFAULT 'member',
        PRIMARY KEY (project_id, user_id),
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (user_id) REFERENCES users_2(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        project_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'todo' 
        CHECK (status IN ('todo', 'in_progress', 'done')),
        assigned_to INTEGER,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (assigned_to)
        REFERENCES users_2(id)
    );
    CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id),
        user_id INTEGER REFERENCES users_2(id),
        action VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

 try {
    await query(createTablesQuery);
    console.log(" Users Table Created");
    console.log(" Projects Table Created");
    console.log(" Project Members Table Created");
    console.log(" Tasks Table Created");
    console.log(" Activity Logs Table Created");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
    initDatabase
}