import { Project } from "../schemas/project";

class ProjectModel {
  static create = async (newProjectData) => {
    const newProject = Project.create(newProjectData);
    return newProject;
  };

  static findByProjectId = async ({ projectId }) => {
    const project = Project.findOne({ projectId });
    return project;
  };
  static modify = async (userId, updateProjectData) => {
    const filter = { userId };
    const updateContext = updateProjectData;
    const option = { returnOriginal: false };

    const modifiedProject = await Project.findOneAndUpdate(
      filter,
      updateContext,
      option
    );
    return modifiedProject;
  };
}

export { ProjectModel };
