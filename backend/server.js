const express = require("express");
const app = express();
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
    const getUserQuery = `SELECT * FROM users WHERE name = $1 AND password = $2`;
    try{
        const result = await db.query(getUserQuery, [
            name,
            password
        ]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});