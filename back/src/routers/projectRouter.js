const { Router } = require("express");
const projectRouter = Router();

import { login_required } from "../middlewares/login_required";

const projectService = require("../services/projectService");
projectRouter.use(login_required);

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

projectRouter.put("/projects/:id", async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const { title, description, fromDate, toDate } = req.body;

    const updateData = { title, description, fromDate, toDate };

    const project = await projectService.setProject({ projectId, updateData });
    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).json({
      project,
    });
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projectlist/:user_id", async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const projectList = await projectService.getProjectList({ user_id });
    res.status(200).json(projectList);
  } catch (error) {
    next(error);
  }
});

module.exports = projectRouter;
