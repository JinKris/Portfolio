const projectModel = require("../schema/project");

class Project {
  static create = async ({ newProject }) => {
    console.log(newProject);
    const createdNewUser = await projectModel.create(newProject);
    return createdNewUser;
  };
}

module.exports = Project;
