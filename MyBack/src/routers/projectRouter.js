const { Router } = require("express");
const projectRouter = Router();

const projectService = require("../services/projectService");

projectRouter.post("/project/create", async (req, res, next) => {
  const { user_id, title, description, fromDate, toDate } = req.body;

  const newProject = await projectService.addProject({
    user_id,
    title,
    description,
    fromDate: fromDate,
    toDate: toDate,
  });

  res.json({
    newProject,
  });
});

module.exports = projectRouter;
