import format from "pg-format";
import { TProjects, TProjectsRequest } from "../interfaces/projects.interfaces";
import { QueryResult } from "pg";
import { client } from "../database";
import { Request, Response } from "express";

const createProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TProjectsRequest = req.body;

  const queryString: string = format(
    `
      INSERT INTO projects (%I)
      VALUES (%L)
      RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TProjects> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const deleteProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
  DELETE FROM projects
  WHERE id = %L
  `,
    id
  );

  await client.query(queryString);

  return res.status(204).send();
};

export { createProjects, deleteProjects };
