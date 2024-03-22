import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateNewProject, primaryDatabase } from '../utils/db';

export const getProjects = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'projects retrieved successfully'
  });
};
export const createProject = async (req: Request, res: Response) => {
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
    primaryDatabase.$connect();
    const createdProject = await primaryDatabase.markdownDocument.create({
      data: newDocument
    });
    console.log('New Markdown Document created: ' + createdProject);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(418).json({
        success: false,
        message: err.meta?.casue
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong! Please try again.'
      });
    }
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
