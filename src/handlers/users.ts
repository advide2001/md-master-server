import { Request, Response } from 'express';
import { primaryDatabase } from '../utils/db';

export const getUsers = async (req: Request, res: Response) => {
  const users = await primaryDatabase.user.findMany();
  res.json({ data: users });
};
