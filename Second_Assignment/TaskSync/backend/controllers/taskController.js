const db = require("../models/connection");
const getTasks = async (req, res) => {
    const { projectId } = req.params;
    try {
        const taskQuery = `
            SELECT id, title, description, status, assigned_to FROM tasks  WHERE project_id = $1;
        `;
        const result = await db.query(taskQuery, [projectId]);
        return res.status(200).json({
            status: "success",
            totalTasks: result.rowCount,
            tasks: result.rows
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
const createTask = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, assigned_to } = req.body;
    if (!title) {
        return res.status(400).json({
            status: "failed",
            message: "Task title is required"
        });
    }
    try {
        const taskQuery = `
            INSERT INTO tasks(project_id, title, description, status, assigned_to)
            VALUES($1, $2, $3, 'todo', $4)
            RETURNING *;
        `;
        const result = await db.query(taskQuery, [
            projectId,
            title,
            description,
            assigned_to || null
        ]);
        return res.status(201).json({
            status: "success",
            message: "Task Created Successfully",
            task: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { status, assigned_to } = req.body;

    if (!status && !assigned_to) {
        return res.status(400).json({
            status: "failed",
            message: "Provide status or assigned_to to update"
        });
    }
    try {
        const taskExists = await db.query(
            "SELECT * FROM tasks WHERE id = $1",
            [taskId]
        );
        if (taskExists.rowCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found"
            });
        }
        let result;
        if (status && assigned_to) {
            const updateQuery = ` UPDATE tasks SET status = $1, assigned_to = $2 WHERE id = $3 RETURNING *;
            `;
            result = await db.query(updateQuery, [status, assigned_to, taskId]);

        } else if (status) {
            const updateQuery = `UPDATE tasks SET status = $1  WHERE id = $2  RETURNING *;
            `;
            result = await db.query(updateQuery, [status, taskId]);
        } else if (assigned_to) {
            const updateQuery = ` UPDATE tasks SET assigned_to = $1 WHERE id = $2  RETURNING *;
            `;
            result = await db.query(updateQuery, [assigned_to, taskId]);
        }
        return res.status(200).json({
            status: "success",
            message: "Task Updated Successfully",
            task: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
module.exports = {getTasks,createTask,updateTask};