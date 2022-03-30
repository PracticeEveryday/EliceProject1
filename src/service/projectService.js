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

  static modifyProject = async ({
    userId,
    projectId,
    title,
    fromDate,
    toDate,
  }) => {
    const project = await ProjectModel.findByProjectId({ projectId });
    if (!project) {
      const errorMessage = "해당 프로젝트가 없습니다 다시 확인해 주세요";
      return { errorMessage };
    } else if (String(project.userId) !== userId) {
      const errorMessage =
        "해당 프로젝트의 유저와 일치하지 않습니다 다시 확인해 주세요";
      return { errorMessage };
    } else {
      const updateProjectData = {
        title,
        fromDate,
        toDate,
      };
      const modifiedProject = await ProjectModel.modify(
        userId,
        updateProjectData
      );
      return modifiedProject;
    }
  };

  static findAll = async ({ userId }) => {
    const projects = await ProjectModel.findAll({ userId });
    if (!projects) {
      const errorMessage = "해당 유저의 프로젝트 내역이 없습니다.";
      return { errorMessage };
    }
    return projects;
  };
}

export { ProjectService };
