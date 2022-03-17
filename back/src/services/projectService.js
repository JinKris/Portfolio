const { Project } = require("../db");
const { v4: uuidv4 } = require("uuid");

class projectService {
  static addProject = async ({
    user_id,
    title,
    description,
    from_date,
    to_date,
  }) => {
    const id = uuidv4();
    const newProject = { user_id, title, description, from_date, to_date, id };
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

  static setProject = async ({ projectId, updateData }) => {
    let project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage = "해당 id의 수상 이력은 없습니다.";
      return { errorMessage };
    }

    if (updateData.title) {
      const updateDataField = "title";
      const newValue = updateData.title;
      project = await Project.update({ projectId, updateDataField, newValue });
    }
    if (updateData.description) {
      const updateDataField = "description";
      const newValue = updateData.description;
      project = await Project.update({ projectId, updateDataField, newValue });
    }
    if (updateData.from_date) {
      const updateDataField = "from_date";
      const newValue = updateData.from_date;
      project = await Project.update({ projectId, updateDataField, newValue });
    }
    if (updateData.to_date) {
      const updateDataField = "to_date";
      const newValue = updateData.to_date;
      project = await Project.update({ projectId, updateDataField, newValue });
    }
    return project;
  };

  static getProjectList = async ({ user_id }) => {
    const projects = await Project.findByUserId({ user_id });
    return projects;
  };
}

module.exports = projectService;
