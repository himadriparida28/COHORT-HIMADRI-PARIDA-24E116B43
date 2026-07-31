require("dotenv").config();
const cors = require("cors");
const db = require("./models/connections.js");
const { initDatabase } = require("./controllers/initDb.js");
initDatabase();
const  express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to User Management API'
    })
})
app.get('/users', async(req, res) => {
    const getUsersQuery = `SELECT * FROM Users_new`;
    try {
        const result = await db.query(getUsersQuery);
        res.status(200).json(result.rows)
        
    }

    catch (error) {
    res.status(500).json([]);
}
    }
)

app.post('/user', async(req, res) => {
      const { username, registration_no, email, password,age} = req.body;
        const insertUserQuery = `INSERT INTO Users_new (username, registration_no, email, password, age) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        try{
            const result = await db.query(insertUserQuery, [
            username,
            registration_no,
            email,
            password,
            age
        ]);
        res.status(201).json(result.rows[0]);}
        catch (error) {
        res.status(500).json({ error: 'Failed to create user' });

        }
   } )
app.post('/login',async(req, res) => {
    const { username, password } = req.body;
    const loginQuery = `SELECT * FROM Users_new WHERE username = $1 AND password = $2`;
    try{
        const result = await db.query(loginQuery, [
            username,password
        ]);
        res.status(200).json(result.rows[0]);
   
 }
    catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});
app.patch('/profile', async(req, res) => {
    const { new_email, new_password ,new_age,email,password} = req.body;
    const loginQuery = `SELECT * FROM Users_new WHERE email = $1 AND password = $2`;
    
        const result = await db.query(loginQuery, [email,password]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found. Invalid email or password."
            });
        }
    const updateUserQuery = `UPDATE Users_new SET email = $1,password=$2, age = $3 WHERE email = $4  AND password = $5 RETURNING *`;
    try
    {
        const result= await db.query(updateUserQuery, [ new_email, new_password, new_age,email,password]);
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
    const { registration_no } = req.body;
    const deleteUserQuery = `DELETE FROM Users_new WHERE registration_no = $1`;
    try {
        await db.query(deleteUserQuery, [registration_no]);
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});