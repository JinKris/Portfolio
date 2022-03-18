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
    const { user_id, title, description, from_date, to_date } = req.body;

    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      from_date: from_date,
      to_date: to_date,
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

    const { title, description, from_date, to_date } = req.body;

    const updateData = { title, description, from_date, to_date };

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
