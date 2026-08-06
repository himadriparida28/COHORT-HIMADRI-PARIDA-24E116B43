const db = require("../models/connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            status: "failed",
            message: "All fields are required"
        });
    }
    try {
        const userExists = await db.query(
            "SELECT * FROM users_2 WHERE email = $1",
            [email]
        );
        if (userExists.rowCount > 0) {
            return res.status(409).json({
                status: "failed",
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const registerQuery = `
            INSERT INTO users_2(username, email, password)
            VALUES($1, $2, $3)
            RETURNING id, username, email;
        `;
        const result = await db.query(registerQuery, [
            username,
            email,
            hashedPassword
        ]);
        const user = result.rows[0];
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000
        });
        return res.status(201).json({
            status: "success",
            message: "User Registered Successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: "failed",
            message: "Email and Password are required"
        });
    }
    try {
        const loginQuery = `
            SELECT *
            FROM users_2
            WHERE email = $1;
        `;
        const result = await db.query(loginQuery, [email]);
        if (result.rowCount === 0) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid Email or Password"
            });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid Email or Password"
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000
        });
        return res.status(200).json({
            status: "success",
            message: "Login Successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        status: "success",
        message: "Logged Out Successfully"
    });
};
const getProfile = async (req, res) => {
    try {
        const profileQuery = `
            SELECT id, username, email
            FROM users_2
            WHERE id = $1;
        `;
        const result = await db.query(profileQuery, [req.user.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: "success",
            user: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
const forgotPassword = async (req, res) => {

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({
            status: 'failed',
            message: 'Email and new password are required'
        });
    }

    try {

        const userExists = await db.query(
            'SELECT * FROM users_2 WHERE email = $1',
            [email]
        );

        if (userExists.rowCount === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query(
            'UPDATE users_2 SET password = $1 WHERE email = $2',
            [hashedPassword, email]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
        });

    } catch (error) {

        return res.status(500).json({
            status: 'failed',
            message: error.message
        });

    }

};

const updateProfile = async (req, res) => {

    const { username } = req.body;

    if (!username) {
        return res.status(400).json({
            status: 'failed',
            message: 'Username is required'
        });
    }

    try {

        const updateQuery = `
            UPDATE users_2
            SET username = $1
            WHERE id = $2
            RETURNING id, username, email;
        `;

        const result = await db.query(updateQuery, [username, req.user.id]);

        return res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            user: result.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            status: 'failed',
            message: error.message
        });

    }

};
module.exports = {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    updateProfile
};
