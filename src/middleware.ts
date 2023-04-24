import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "./database";
import { TDeveloper } from "./interfaces/developers.interfaces";
import { TProjects } from "./interfaces/projects.interfaces";

const ensureDeveloperExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let id: number = Number(req.params.id);

  if (req.route.path === "/projects" && req.method === "POST") {
    id = req.body.developerId;
  }

  const queryString: string = format(
    `
    SELECT * FROM developers
    WHERE id = %L;
    `,
    id
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);
  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Developer not found.",
    });
  }

  return next();
};

const checkIfEmailAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  const queryString: string = format(
    `
    SELECT * FROM developers
    WHERE email = %L
    `,
    email
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "Email already exists.",
    });
  }

  return next();
};

const ensureProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM projects
    WHERE id = %L
    `,
    id
  );

  const queryResult: QueryResult<TProjects> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Project not found.",
    });
  }

  return next();
};

const checkIfInfoAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM developer_infos
    WHERE "developerId" = %L
    `,
    developerId
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "Developer infos already exists.",
    });
  }

  return next();
};

const checkIfTechnologyAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM developer_infos
    WHERE "developerId" = %L
    `,
    developerId
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "This technology is already associated with the project",
    });
  }

  return next();
};

export {
  ensureDeveloperExists,
  checkIfEmailAlreadyExists,
  ensureProjectExists,
  checkIfInfoAlreadyExists,
};
