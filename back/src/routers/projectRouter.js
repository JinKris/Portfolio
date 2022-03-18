import is from "@sindresorhus/is";
import { Router } from "express";
const projectRouter = Router();

import { loginRequired } from "../middlewares/loginRequired";

import { projectService } from "../services/projectService";
projectRouter.use(loginRequired);

projectRouter.post("/project/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { userId, title, description, fromDate, toDate } = req.body;

    const newProject = await projectService.addProject({
      userId,
      title,
      description,
      fromDate: fromDate,
      toDate: toDate,
    });

    res.status(200).json({
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

projectRouter.get("/projectlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const projectList = await projectService.getProjectList({ userId });
    res.status(200).json(projectList);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/projects/:id", async (req, res, next) => {
  try {
    const projectId = req.params.id;
    console.log(projectId);

    const result = await projectService.deleteProject({ projectId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
