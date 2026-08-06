const db = require("../models/connection");
const createProject = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({
            status: "failed",
            message: "Project name is required"
        });
    }
    const client = await db.client();
    try {
        await client.query("BEGIN");
        const projectQuery = `
            INSERT INTO projects(name, description, owner_id) VALUES($1, $2, $3) RETURNING *;
        `;
        const projectResult = await client.query(
            projectQuery,
            [name, description, req.user.id]
        );
        const project = projectResult.rows[0];
        const memberQuery = `
            INSERT INTO project_members(project_id, user_id, role) VALUES($1, $2, $3);
        `;
        await client.query(
            memberQuery,
            [project.id, req.user.id, "admin"]
        );
        await client.query("COMMIT");
        return res.status(201).json({
            status: "success",
            message: "Project created successfully",
            project
        });
    } catch (error) {
        await client.query("ROLLBACK");
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    } finally {
        client.release();
    }
};
const getMyProjects = async (req, res) => {
    try {
        const memberQuery = ` SELECT project_id, role  FROM project_members  WHERE user_id = $1;
        `;
        const memberResult = await db.query(
            memberQuery,
            [req.user.id]
        );
        const projects = [];
        for (const member of memberResult.rows) {
            const projectQuery = `
                SELECT id, name, description FROM projects WHERE id = $1;
            `;
            const projectResult = await db.query(
                projectQuery,
                [member.project_id]
            );
            if (projectResult.rowCount > 0) {
                projects.push({
                    id: projectResult.rows[0].id,
                    name: projectResult.rows[0].name,
                    description: projectResult.rows[0].description,
                    role: member.role
                });
            }
        }
        return res.status(200).json({
            status: "success",
            totalProjects: projects.length,
            projects
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
const inviteMember = async (req, res) => {
    const { email } = req.body;
    const { projectId } = req.params;
    if (!email) {
        return res.status(400).json({
            status: "failed",
            message: "Email is required"
        });
    }
    if (isNaN(projectId)) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid Project ID"
        });
    }
    const client = await db.client();
    try {
        await client.query("BEGIN");
        const adminQuery = `
            SELECT * FROM project_members WHERE project_id = $1  AND user_id = $2  AND role = 'admin';
        `;
        const adminResult = await client.query(
            adminQuery,
            [projectId, req.user.id]
        );
        if (adminResult.rowCount === 0) {
            await client.query("ROLLBACK");
            return res.status(403).json({
                status: "failed",
                message: "Only project admin can invite members"
            });

        }
        const userQuery = `
            SELECT id FROM users_2 WHERE email = $1;
        `;
        const userResult = await client.query(
            userQuery,
            [email]
        );
        if (userResult.rowCount === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        const userId = userResult.rows[0].id;
        if (userId === req.user.id) {
            await client.query("ROLLBACK");
            return res.status(400).json({
                status: "failed",
                message: "You are already the project admin"
            });

        }
        const memberQuery = ` SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2;
        `;
        const memberResult = await client.query(
            memberQuery,
            [projectId, userId]
        );
        if (memberResult.rowCount > 0) {
            await client.query("ROLLBACK");
            return res.status(409).json({
                status: "failed",
                message: "User is already a project member"
            });
        }
        const inviteQuery = `INSERT INTO project_members(project_id, user_id, role) VALUES($1, $2, 'member');
        `;
        await client.query(
            inviteQuery,
            [projectId, userId]
        );
        await client.query("COMMIT");
        return res.status(200).json({
            status: "success",
            message: "Member invited successfully"
        });
    } catch (error) {
        await client.query("ROLLBACK");
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    } finally {
        client.release();
    }
};
module.exports = {createProject,getMyProjects,inviteMember};