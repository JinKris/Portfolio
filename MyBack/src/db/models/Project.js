const projectModel = require("../schema/project");

class Project {
  static create = async ({ newProject }) => {
    console.log(newProject);
    const createdNewUser = await projectModel.create(newProject);
    return createdNewUser;
  };

  static findById = async ({ projectId }) => {
    const project = await projectModel.findOne({ id: projectId });
    return project;
  };

  static update = async ({ projectId, updateDataField, newValue }) => {
    const filter = { id: projectId };
    const update = { [updateDataField]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  };

  static findByUserId = async ({ user_id }) => {
    const projects = projectModel.find({ user_id });
    return projects;
  };
}

module.exports = Project;
