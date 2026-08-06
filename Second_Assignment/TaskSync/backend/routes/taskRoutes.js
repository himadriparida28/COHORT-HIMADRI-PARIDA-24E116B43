const taskRoute = require("express").Router();
const {getTasks, createTask, updateTask} = require("../controllers/taskController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {projectMemberMiddleware} = require("../middlewares/projectMemberMiddleware");

taskRoute
.get("/projects/:projectId/tasks", authMiddleware, projectMemberMiddleware, getTasks)
.post("/projects/:projectId/tasks", authMiddleware, projectMemberMiddleware, createTask)
.put("/tasks/:taskId", authMiddleware, updateTask)

module.exports = {taskRoute};