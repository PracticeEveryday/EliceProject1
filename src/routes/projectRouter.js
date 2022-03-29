import { Router } from "express";

import { ProjectService } from "../service/projectService";

const projectRouter = Router();

projectRouter.get("/project", (req, res) => {
  res.status(200).json({
    status: "succ",
  });
});

export { projectRouter };
