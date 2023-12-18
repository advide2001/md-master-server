import { Request, Response } from 'express';
import { primaryDatabase } from '../utils/db';
import { createUserBodySchema } from '../types/requestBodySchema';
import { ZodError } from 'zod';

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
  const { body } = req;

  try {
    const data = createUserBodySchema.parse(body);
    try {
      const user = await primaryDatabase.user.create({
        data: data
      });
      res.status(200).json({ data: user });
    } catch (e) {
      res.status(502).json({ error: 'failed database connection' });
    }
  } catch (e) {
    const error = e as ZodError;
    return res.status(422).json({ errors: error.errors });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

export const deleteUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
};
