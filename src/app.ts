import express, { Application } from "express";
import "dotenv/config";
import { createDevelopers, deleteDevelopers, updateDevelopers } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/developers", createDevelopers);
app.patch("/developers/:id", updateDevelopers);
app.delete("/developers/:id", deleteDevelopers);
app.post("/developers/:id/infos");

export default app;
