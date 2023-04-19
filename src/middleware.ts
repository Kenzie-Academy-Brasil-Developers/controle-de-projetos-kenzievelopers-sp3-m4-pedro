import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "./database";
import { TDeveloper } from "./interfaces/developers.interfaces";

const ensureDeveloperExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM developers
    WHERE id = %L
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
  const { name } = req.body;

  const queryString: string = format(
    `
    SELECT * FROM developers
    WHERE email = %L
    `,
    name
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    return res.status(409).json({
      message: "Email already exists.",
    });
  }

  return next();
};

export { ensureDeveloperExists, checkIfEmailAlreadyExists };
