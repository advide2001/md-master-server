import { Request, Response } from 'express';

export const getProjects = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'projects retrieved successfully'
  });
};
export const createProject = async (req: Request, res: Response) => {
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
