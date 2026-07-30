require("dotenv").config();
const cors = require("cors");
const db = require("../models/connections.js");
const express = require("express");
const { initDatabase } = require("../controllers/initDb.js");
initDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req,res) => {
     res.status(200).json({
        status: 'success',
        message: 'Welcome to User Management API',
    });
})
app.get("/users", async (req, res) => {
    const getusers = `SELECT * FROM users`;
    try {
        const result = await db.query(getusers);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json([]);
    }
});
app.post('/users', async (req, res) => {
    const { name,registration_number , email, password, age } = req.body;
    try {
        const createUserQuery = `
            INSERT INTO users ( name,registration_number , email, password,age )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `
         const result = await db.query(createUserQuery, [
            name,
            registration_number,
            email,
            password,
            age
        ]);

        res.status(201).json({
            status: "Success",
            message: "Created user successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to create user",
        });
    }
});
app.post('/login',async(req, res) => {
    const { name, password } = req.body;
    const getLoginQuery = `SELECT * FROM users WHERE name = $1 AND password = $2`;
    try{
        const result = await db.query(getLoginQuery, [
            name,
            password
        ]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});
app.patch('/profile', async(req, res) => {
    const { name, password } = req.body;
    const loginQuery = `SELECT * FROM users WHERE name = $1 AND password = $2`;
    try{
        const result = await db.query(loginQuery, [
            name,
            password
        ]);
        res.status(200).json(result.rows[0]);
   
 

    const { name, email, age } = req.body;
    const updateUserQuery = `UPDATE users SET email = $1, age = $2 WHERE name = $3 RETURNING *`;
    try
    {
        const result= await db.query(updateUserQuery, [
            email, age, name

        ]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
}
catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});
app.delete("/profile", async (req, res) => {
    const getuser = req.user.registration_number;
    const deleteUserQuery = `DELETE FROM users WHERE registration_number = $1`;
    try {
        await db.query(deleteUserQuery, [getuser]);
        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong"
        });
    }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});