import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateNewProject, primaryDatabase } from '../utils/db';

export const getProjects = async (req: Request, res: Response) => {
  const userId = 'clu2qndu20002nqzx66cuxf8d'; // TODO make this dynamic

  try {
    primaryDatabase.$connect();
    const markdownDocuments = await primaryDatabase.markdownDocument.findMany({
      where: {
        authorId: userId
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      retrievedProjects: markdownDocuments
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(418).json({
        success: false,
        message: err.meta?.cause
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
};

export const createProject = async (req: Request, res: Response) => {
  const newDocument: CreateNewProject = {
    documentTitle: req.body.title,
    documentContent: req.body.content,
    author: {
      connect: {
        userId: 'clu2qndu20002nqzx66cuxf8d' // TODO make this dynamic
      }
    }
  };
  try {
    primaryDatabase.$connect();
    const markdownDocument = await primaryDatabase.markdownDocument.create({
      data: newDocument
    });
    return res.status(200).json({
      success: true,
      message: 'Project created Successfully',
      createdProject: markdownDocument
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(418).json({
        success: false,
        message: err.meta?.cause
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
};

export const updateProject = async (req: Request, res: Response) => {
  const { documentId, newTitle } = req.body;
  try {
    primaryDatabase.$connect();
    const updatedDocument = await primaryDatabase.markdownDocument.update({
      where: {
        documentId: documentId
      },
      data: {
        documentTitle: newTitle
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Document updated successfully',
      updatedProject: updatedDocument
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        success: false,
        message: err.meta?.cause
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong! Please try again.'
      });
    }
  } finally {
    primaryDatabase.$disconnect();
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const projectId = 'clu8gvq0j0000vhvc993w9m3d'; // TODO Make this dynamic

  try {
    primaryDatabase.$connect();
    const deletedMarkdownDocument =
      await primaryDatabase.markdownDocument.delete({
        where: {
          documentId: projectId
        }
      });

    return res.status(200).json({
      success: true,
      message: 'document deleted successfully',
      deletedProject: deletedMarkdownDocument
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        success: false,
        message: err.meta?.cause
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong! Please try again.'
      });
    }
  } finally {
    primaryDatabase.$disconnect();
  }
};
