import { Request, Response } from 'express';
import { primaryDatabase } from '../utils/db';

export const getUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await primaryDatabase.user.findUnique({
    where: { user_id: req.params.id }
  });
  if (user == null) res.sendStatus(404);
  res.json({ data: user });
};

export const createUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const updateUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const deleteUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};
