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
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});