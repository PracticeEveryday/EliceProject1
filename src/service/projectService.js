import { ProjectModel } from "../db";

import { v4 as uuidv4 } from "uuid";
class ProjectService {
  static create = async ({ userId, title, fromDate, toDate }) => {
    const id = uuidv4();
    const newProjectData = {
      projectId: id,
      userId,
      title,
      fromDate,
      toDate,
    };
    const newProject = ProjectModel.create(newProjectData);
    return newProject;
  };
}

export { ProjectService };
