const { Router } = require("express");
const projectRouter = Router();

const projectService = require("../services/projectService");

projectRouter.post("/project/create", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projects/:id", async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await projectService.getProject({ projectId });
    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

module.exports = projectRouter;
