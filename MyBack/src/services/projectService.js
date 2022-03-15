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
    if (updateData.fromDate) {
      const updateDataField = "fromDate";
      const newValue = updateData.fromDate;
      project = await Project.update({ projectId, updateDataField, newValue });
    }
    if (updateData.toDate) {
      const updateDataField = "toDate";
      const newValue = updateData.toDate;
      project = await Project.update({ projectId, updateDataField, newValue });
    }
    return project;
  };
}

module.exports = projectService;
