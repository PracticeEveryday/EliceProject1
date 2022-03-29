import { Project } from "../schemas/project";

class ProjectModel {
  static create = async (newProjectData) => {
    const newProject = Project.create(newProjectData);
    return newProject;
  };
}

export { ProjectModel };
