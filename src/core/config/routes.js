import { Router } from "express";
import { CreateUserController, DeleteUserController, ListUserController, LoginController, UpdateUserController } from "../../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.post("/login", async (req, res) => {
  const result = await LoginController.handle(req);
  res.status(result.statusCode).json(result.body);
});

routes.post("/user", authMiddleware, async (req, res) => {
  const result = await CreateUserController.handle(req);
  res.status(result.statusCode).json(result.body);
});

routes.put("/user/:id", authMiddleware, async (req, res) => {
  const result = await UpdateUserController.handle(req);
  res.status(result.statusCode).json(result.body);
});

routes.delete("/user/:id", authMiddleware, async (req, res) => {
  const result = await DeleteUserController.handle(req);
  res.status(result.statusCode).json(result.body);
});

routes.get("/users", authMiddleware, async (req, res) => {
  const result = await ListUserController.handle(req);
  res.status(result.statusCode).json(result.body);
});

export default routes;
