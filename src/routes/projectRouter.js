import { Router } from "express";

import { ProjectService } from "../service/projectService";

const projectRouter = Router();

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
