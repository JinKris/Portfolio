const { Project } = require("../db");
const { v4: uuidv4 } = require("uuid");

class projectService {
  static addProject = async ({
    user_id,
    title,
    description,
    fromDate,
    toDate,
  }) => {
    const id = uuidv4();
    const newProject = { user_id, title, description, fromDate, toDate, id };
    const createdProject = await Project.create({ newProject });
    return createdProject;
  };

  static getProject = async ({ projectId }) => {
    const project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage = "해당 id를 가진 수상 데이터는 없습니다";
      return { errorMessage };
    }

    return project;
  };
}

module.exports = projectService;
