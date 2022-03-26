import { Router } from "express";
import { educationService } from "../service/educationService";

const educationRouter = Router();

educationRouter.post("/education/create", async (req, res, next) => {
  const userId = req.user.ObjectId;
  const { school, fromDate, toDate } = req.body;
  const newEducation = await educationService.create({
    userId,
    school,
    fromDate,
    toDate,
  });
  res.status(200).json(newEducation);
});

educationRouter.get("/education", (req, res, next) => {
  res.json({
    status: "succ",
  });
});

export { educationRouter };
