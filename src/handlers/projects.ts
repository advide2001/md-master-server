import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateNewProject, primaryDatabase } from '../utils/db';

export const getProjects = async (req: Request, res: Response) => {
  const paramUserId = req.query.userId as string;
  if (paramUserId === undefined || paramUserId === '') {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid user ID.'
    });
  }

  const tokenUserId = req?.auth?.claims?.userId as string;
  if (tokenUserId === undefined) {
    return res.status(400).json({
      success: false,
      message: 'User ID not found in JWT claims, use the right JWT template!'
    });
  }

  if (paramUserId !== tokenUserId) {
    return res.status(403).json({
      success: false,
      message: 'You dont have the authorization to access this resource.'
    });
  }

  try {
    primaryDatabase.$connect();
    const markdownDocuments = await primaryDatabase.markdownDocument.findMany({
      where: {
        authorId: paramUserId
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
  const tokenUserId = req?.auth?.claims?.userId as string;

  if (tokenUserId === undefined) {
    return res.status(400).json({
      success: false,
      message: 'User ID not found in JWT claims, use the right JWT template!'
    });
  }

  const newDocument: CreateNewProject = {
    documentTitle: req.body.title,
    documentContent: req.body.content,
    author: {
      connect: {
        userId: tokenUserId
      }
    }
  };
  try {
    primaryDatabase.$connect();
    const markdownDocument = await primaryDatabase.markdownDocument.create({
      data: newDocument,
      select: {
        documentId: true,
        documentTitle: true,
        createdAt: true,
        updatedAt: true,
        authorId: true
      }
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
  const tokenUserId = req?.auth?.claims?.userId as string;

  if (tokenUserId === undefined) {
    return res.status(400).json({
      success: false,
      message: 'User ID not found in JWT claims, use the right JWT template!'
    });
  }

  if (documentId === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a proper documentId'
    });
  }

  if (newTitle === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a New Title for the document'
    });
  }

  try {
    primaryDatabase.$connect();
    let markdownDocument = await primaryDatabase.markdownDocument.findUnique({
      where: {
        documentId: documentId
      }
    });

    if (!markdownDocument) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    if (markdownDocument && markdownDocument.authorId === tokenUserId) {
      markdownDocument = await primaryDatabase.markdownDocument.update({
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
        updatedProject: markdownDocument
      });
    }
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
  const documentId = req.query.documentId as string;
  const tokenUserId = req?.auth?.claims?.userId as string;

  try {
    primaryDatabase.$connect();
    let markdownDocument = await primaryDatabase.markdownDocument.findUnique({
      where: {
        documentId: documentId
      }
    });

    if (markdownDocument && markdownDocument.authorId === tokenUserId) {
      markdownDocument = await primaryDatabase.markdownDocument.delete({
        where: {
          documentId: documentId
        }
      });

      return res.status(200).json({
        success: true,
        message: 'document deleted successfully',
        deletedProject: markdownDocument
      });
    }
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
