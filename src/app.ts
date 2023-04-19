import express, { Application } from "express";
import "dotenv/config";
import {
  createDevelopers,
  createDevelopersInfos,
  deleteDevelopers,
  updateDevelopers,
} from "./logics/developers";
import { checkIfEmailAlreadyExists, ensureDeveloperExists } from "./middleware";

const app: Application = express();
app.use(express.json());

app.post("/developers", checkIfEmailAlreadyExists, createDevelopers);
app.post(" /developers/:id/infos", createDevelopersInfos);
app.get("/developers/:id", ensureDeveloperExists);
app.patch(
  "/developers/:id",
  ensureDeveloperExists,
  checkIfEmailAlreadyExists,
  updateDevelopers
);
app.delete("/developers/:id", ensureDeveloperExists, deleteDevelopers);
app.post("/developers/:id/infos");

app.post("/projects", createDevelopers);
app.get("/projects/:id");
app.patch("/projects/:id");
app.delete("/projects/:id");
app.post("/projects/:id/technologies");
app.delete("/projects/:id/technologies/:name");

export default app;
