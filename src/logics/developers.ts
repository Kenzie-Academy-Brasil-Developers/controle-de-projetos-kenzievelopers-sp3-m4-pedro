import { Request, Response } from "express";
import format from "pg-format";
import { json } from "stream/consumers";
import { QueryResult } from "pg";
import { client } from "../database";
import {
  TDeveloperRequest,
  TDeveloper,
  TDeveloperInfos,
  TDeveloperInfosRequest,
} from "../interfaces/developers.interfaces";

const createDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDeveloperRequest = req.body;

  const queryString: string = format(
    `
    INSERT INTO developers (%I)
    VALUES (%L)
    RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const createDevelopersInfos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDeveloperInfosRequest = req.body;
  payload.developerId = Number(req.params.id);

  const queryString: string = format(
    `
    INSERT INTO developers (%I)
    VALUES (%L)
    RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TDeveloperInfos> = await client.query(
    queryString
  );

  return res.status(201).json(queryResult.rows[0]);
};

const updateDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDeveloperRequest = req.body;
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    UPDATE developers
    SET(%I) = ROW(%I)
    WHERE id = %L
    RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: QueryResult<TDeveloper> = await client.query(queryString);

  return res.status(200).json(queryResult.rows[0]);
};

const deleteDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    DELETE FROM developers
    WHERE id = %L
    `,
    id
  );

  await client.query(queryString);

  return res.status(204).send();
};

const createDeveloperInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TDeveloperRequest = req.body;
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    INSERT INTO developer_infos (%I)
    VALUES (%L)
    RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: QueryResult<TDeveloperInfos> = await client.query(
    queryString
  );

  return res.status(201).json(queryResult.rows[0]);
};

export {
  createDevelopers,
  updateDevelopers,
  deleteDevelopers,
  createDeveloperInfo,
};
