const db = require('../models/connection');

const getTasks = async (req, res) => {

    const { projectId } = req.params;

    try {

        const taskQuery = `
            SELECT id, title, description, status, assigned_to
            FROM tasks
            WHERE project_id = $1;
        `;

        const result = await db.query(taskQuery, [projectId]);

        return res.status(200).json({
            status: 'success',
            totalTasks: result.rowCount,
            tasks: result.rows
        });

    } catch (error) {

        return res.status(500).json({
            status: 'failed',
            message: error.message
        });

    }

};

const createTask = async (req, res) => {

    const { projectId } = req.params;
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'failed',
            message: 'Task title is required'
        });
    }

    try {

        const taskQuery = `
            INSERT INTO tasks(project_id, title, description, status)
            VALUES($1, $2, $3, 'todo')
            RETURNING *;
        `;

        const result = await db.query(taskQuery, [projectId, title, description]);

        // log activity
        const logQuery = `
            INSERT INTO activity_logs(project_id, user_id, action)
            VALUES($1, $2, $3);
        `;
        await db.query(logQuery, [projectId, req.user.id, `Created task: "${title}"`]);

        return res.status(201).json({
            status: 'success',
            message: 'Task Created Successfully',
            task: result.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            status: 'failed',
            message: error.message
        });

    }

};

const updateTask = async (req, res) => {

    const { taskId } = req.params;
    const { status, assigned_to } = req.body;

    if (!status && !assigned_to) {
        return res.status(400).json({
            status: 'failed',
            message: 'Provide status or assigned_to to update'
        });
    }

    try {

        const taskExists = await db.query(
            'SELECT * FROM tasks WHERE id = $1',
            [taskId]
        );

        if (taskExists.rowCount === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'Task not found'
            });
        }

        let result;

        if (status && assigned_to) {
            const updateQuery = `
                UPDATE tasks
                SET status = $1, assigned_to = $2
                WHERE id = $3
                RETURNING *;
            `;
            result = await db.query(updateQuery, [status, assigned_to, taskId]);
        } else if (status) {
            const updateQuery = `
                UPDATE tasks
                SET status = $1
                WHERE id = $2
                RETURNING *;
            `;
            result = await db.query(updateQuery, [status, taskId]);
        } else if (assigned_to) {
            const updateQuery = `
                UPDATE tasks
                SET assigned_to = $1
                WHERE id = $2
                RETURNING *;
            `;
            result = await db.query(updateQuery, [assigned_to, taskId]);
        }

        // log activity
        const task = result.rows[0];
        if (status) {
            const logQuery = `
                INSERT INTO activity_logs(project_id, user_id, action)
                VALUES($1, $2, $3);
            `;
            await db.query(logQuery, [task.project_id, req.user.id, `Moved "${task.title}" to ${status}`]);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Task Updated Successfully',
            task: result.rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            status: 'failed',
            message: error.message
        });

    }

};

const getActivity = async (req, res) => {

    const { projectId } = req.params;

    try {

        const activityQuery = `
            SELECT activity_logs.action, activity_logs.created_at, users_2.username
            FROM activity_logs
            JOIN users_2 ON activity_logs.user_id = users_2.id
            WHERE activity_logs.project_id = $1
            ORDER BY activity_logs.created_at DESC
            LIMIT 10;
        `;

        const result = await db.query(activityQuery, [projectId]);

        return res.status(200).json({
            status: 'success',
            activities: result.rows
        });

    } catch (error) {

        return res.status(500).json({
            status: 'failed',
            message: error.message
        });

    }

};

module.exports = {getTasks, createTask, updateTask, getActivity};