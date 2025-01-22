import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/http-config';
import { Permissions } from '../enums/role.enum';
import { asyncHandler } from '../middlewares/async-handler';
import { getMemberRoleInWorkspace } from '../services/member-service';
import {
  changeMemberRoleService,
  createWorkspaceService,
  getAllUserWorkspacesUserIsMemberService,
  getWorkspaceAnalyticsService,
  getWorkspaceByIdService,
  getWorkspaceMembersService,
} from '../services/workspace-service';
import { roleGuard } from '../utils/role-guard';
import { createWorkspaceSchema, workspaceIdSchema } from '../validation/workspace-validation';
import { changeRoleSchema } from './../validation/workspace-validation';

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
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user?._id;

  await getMemberRoleInWorkspace(userId, workspaceId);

  const { workspace } = await getWorkspaceByIdService(workspaceId);

  return res.status(HTTP_STATUS.OK).json({
    message: 'Workspace fetched successfully',
    workspace,
  });
});

/*
  // *********
  //  GET WORKSPACE MEMBERS
  // *********
*/
export const getWorkspaceMembersController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user?._id;
  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

  roleGuard(role, [Permissions.VIEW_ONLY]);

  const { members, roles } = await getWorkspaceMembersService(workspaceId);

  return res.status(HTTP_STATUS.OK).json({
    message: 'Workspace members fetched successfully',
    members,
    roles,
  });
});

/*
  // ********
  // GET WORKSPACE ANALYTICS
  // ********
*/
export const getWorkspaceAnalyticsController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const { analytics } = await getWorkspaceAnalyticsService(workspaceId);

  res.status(HTTP_STATUS.OK).json({
    message: 'Workspace analytics fetched successfully',
    analytics,
  });
});

/*
  // ********
  // GET WORKSPACE MEMBER ROLES
  // ********
*/
export const changeWorkspaceMemberRoleController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

    const { memberId, roleId } = changeRoleSchema.parse(req.body);

    const { member } = await changeMemberRoleService(memberId, roleId, workspaceId);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Member role updated successfully',
      member,
    });
  },
);
