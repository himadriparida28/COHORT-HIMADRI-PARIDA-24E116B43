const projectRoute = require("express").Router();

const { createProject, getMyProjects, inviteMember } = require("../controllers/projectController");
const { authMiddleware } = require("../middlewares/authMiddleware");

projectRoute
    .post("/", authMiddleware, createProject)                        
    .get("/", authMiddleware, getMyProjects)                         
    .post("/:projectId/invite", authMiddleware, inviteMember);      

module.exports = { projectRoute };