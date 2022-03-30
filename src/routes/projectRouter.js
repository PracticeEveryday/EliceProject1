import { Router } from "express";

import { ProjectService } from "../service/projectService";

const projectRouter = Router();

projectRouter.get("/projectlist", async (req, res, next) => {
  try {
    const userId = req.user.ObjectId;
    const projects = await ProjectService.findAll({ userId });

    if (projects.errorMessage) {
      throw new Error(projects.errorMessage);
    }
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/projects/:projectId", async (req, res, next) => {
  try {
    const userId = req.user.ObjectId;
    const projectId = req.params.projectId;
    const { title, fromDate, toDate } = req.body;
    const modifiedProject = await ProjectService.modifyProject({
      userId,
      projectId,
      title,
      fromDate,
      toDate,
    });
    if (modifiedProject.errorMessage) {
      throw new Error(modifiedProject.errorMessage);
    }
    res.status(200).json(modifiedProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/project/create", async (req, res, next) => {
  try {
    const userId = req.user.ObjectId;
    const { title, fromDate, toDate } = req.body;
    const newProject = await ProjectService.create({
      userId,
      title,
      fromDate,
      toDate,
    });
    console.log(newProject);

    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/project", (req, res) => {
  res.status(200).json({
    status: "succ",
  });
});

export { projectRouter };
