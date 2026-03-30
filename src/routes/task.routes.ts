import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";

const router = Router();

router.get("/", taskController.getAll);
router.get("/:id", taskController.getById);
router.post("/", taskController.create);
router.patch("/:id", taskController.update);
router.delete("/:id", taskController.remove);

export default router;
