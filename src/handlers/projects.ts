import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateNewProject } from '../utils/db';

export const getProjects = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'projects retrieved successfully'
  });
};
export const createProject = async (req: Request, res: Response) => {
  const primaryDatabase = new PrismaClient(); // extract this to utils/db
  const newDocument: CreateNewProject = {
    documentTitle: req.body.title,
    documentContent: req.body.content,
    author: {
      connect: {
        userId: 'clu2qndu20002nqzx66cuxf8d' // connects the document to the user
      }
    }
  };
  try {
    const createdProject = await primaryDatabase.markdownDocument.create({
      data: newDocument
    });
    console.log('New Markdown Document created: ' + createdProject);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.meta?.cause);
    }
    //TODO Add return with error here
  } finally {
    await primaryDatabase.$disconnect();
  }

  return res.status(200).json({
    success: true,
    message: 'project created successfully'
  });
};
export const updateProject = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'project updated successfully'
  });
};
export const deleteProject = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'project deleted successfully'
  });
};
