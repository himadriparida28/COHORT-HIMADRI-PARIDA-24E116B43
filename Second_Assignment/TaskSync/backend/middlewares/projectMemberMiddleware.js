const db = require("../models/connection");
const projectMemberMiddleware = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;
        const memberCheckQuery = `SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2;
        `;
        const result = await db.query(memberCheckQuery, [projectId, userId]);
        if (result.rowCount === 0) {
            return res.status(403).json({
                status: "failed",
                message: "Access Denied. You are not a member of this project."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};
module.exports = {projectMemberMiddleware};