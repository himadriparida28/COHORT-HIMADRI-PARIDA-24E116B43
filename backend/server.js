require("dotenv").config();
const cors = require("cors");
const db = require("./models/connections.js");
const express = require("express");
const { initDatabase } = require("./controllers/initDb.js");
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
    const getusers = `SELECT * FROM users_new`;
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
            INSERT INTO users_new ( name,registration_number , email, password,age )
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
    const getLoginQuery = `SELECT * FROM users_new WHERE name = $1 AND password = $2`;
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
    const {new_email, new_password ,new_age,email , password} = req.body;
    const loginQuery = `SELECT * FROM users_new WHERE email = $1 AND password = $2`;
    
        const result = await db.query(loginQuery, [email,password]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found. Invalid email or password."
            });
        }
    const updateUserQuery = `UPDATE users_new SET email = $1,password=$2, age = $3 WHERE email = $4  AND password = $5 RETURNING *`;
    try
    {
        const result= await db.query(updateUserQuery, [ new_email, new_password, new_age, email, password]);
        res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            data: result.rows[0]
        });
    }

    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong"
        });
    }
});
app.delete("/profile", async (req, res) => {
    const getuser = req.user.registration_number;
    const deleteUserQuery = `DELETE FROM users_new WHERE registration_number = $1`;
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
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});