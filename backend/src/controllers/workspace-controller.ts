import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async-handler';
import { createWorkspaceSchema, workspaceIdSchema } from '../validation/workspace-validation';
import { HTTP_STATUS } from '../config/http-config';
import {
  createWorkspaceService,
  getAllUserWorkspacesUserIsMemberService,
  getWorkspaceByIdService,
} from '../services/workspace-service';

/*
  // *********
  //  CREATE WORKSPACE
  // *********
*/
export const createWorkspaceController = asyncHandler(async (req: Request, res: Response) => {
  const body = createWorkspaceSchema.parse(req.body);

  const userId = req.user?._id;

  const { workspace } = await createWorkspaceService(userId, body);

  return res.status(HTTP_STATUS.OK).json({
    workspace,
  });
});

/*
  // *********
  //  GET ALL WORKSPACES USER IS MEMBER
  // *********
*/
export const getAllWorkspacesUserIsMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { workspaces } = await getAllUserWorkspacesUserIsMemberService(userId);

    return res.status(HTTP_STATUS.OK).json({
      message: 'User workspaces fetched successfully',
      workspaces,
      count: workspaces.length,
    });
  },
);

/*
  // *********
  //  GET WORKSPACE BY ID
  // *********
*/
export const getWorkspaceByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: userId } = req.user!;

  const workspaceId = workspaceIdSchema.parse(id);
  console.log(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: 'Workspace fetched successfully',
    workspace: {},
  });
});
