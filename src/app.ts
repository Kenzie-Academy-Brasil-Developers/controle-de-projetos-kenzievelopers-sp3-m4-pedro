import express, { Application } from "express";
import "dotenv/config";
import {
  createDevelopers,
  createDevelopersInfos,
  deleteDevelopers,
  listDeveloper,
  updateDevelopers,
} from "./logics/developers";
import {
  checkIfEmailAlreadyExists,
  checkIfInfoAlreadyExists,
  ensureDeveloperExists,
  ensureProjectExists,
} from "./middleware";
import { createProjects, deleteProjects } from "./logics/projects";

const app: Application = express();
app.use(express.json());

app.post("/developers", checkIfEmailAlreadyExists, createDevelopers);
app.get("/developers/:id", ensureDeveloperExists, listDeveloper);
app.patch(
  "/developers/:id",
  ensureDeveloperExists,
  checkIfEmailAlreadyExists,
  updateDevelopers
);
app.delete("/developers/:id", ensureDeveloperExists, deleteDevelopers);
app.post(
  "/developers/:id/infos",
  ensureDeveloperExists,
  checkIfInfoAlreadyExists,
  createDevelopersInfos
);

app.post("/projects", ensureDeveloperExists, createProjects);
app.get("/projects/:id", ensureDeveloperExists);
app.patch("/projects/:id", ensureDeveloperExists);
app.delete("/projects/:id", deleteProjects, ensureProjectExists);
app.post("/projects/:id/technologies");
app.delete("/projects/:id/technologies/:name", ensureDeveloperExists);

export default app;
