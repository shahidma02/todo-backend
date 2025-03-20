import { Router } from "express";
import { TodoControllers } from "../controllers/todoController";

const router = Router();

router.post("/", TodoControllers.createTodo);
router.get("/", TodoControllers.getAllTodos);
router.put("/:id", TodoControllers.updateTodo);
router.delete("/:id", TodoControllers.deleteTodo);
router.patch("/:id", TodoControllers.markTodo);
export default router;