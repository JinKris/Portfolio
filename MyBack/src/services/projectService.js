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
}

module.exports = projectService;
