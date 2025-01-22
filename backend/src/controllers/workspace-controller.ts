import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async-handler';
import { createWorkspaceSchema } from '../validation/workspace-validation';
import { HTTP_STATUS } from '../config/http-config';
import {
  createWorkspaceService,
  getAllUserWorkspacesUserIsMemberService,
} from '../services/workspace-service';

export const createWorkspaceController = asyncHandler(async (req: Request, res: Response) => {
  const body = createWorkspaceSchema.parse(req.body);

  const userId = req.user?._id;

  const { workspace } = await createWorkspaceService(userId, body);

  return res.status(HTTP_STATUS.OK).json({
    workspace,
  });
});

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
