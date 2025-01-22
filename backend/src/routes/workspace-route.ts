import { Router } from 'express';
import {
  changeWorkspaceMemberRoleController,
  createWorkspaceController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceAnalyticsController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
} from '../controllers/workspace-controller';

const workspaceRouter = Router();

/*
  // *********
  // WORKSPACE CONTROLLER ROUTES
  // *********
*/
workspaceRouter.post('/create/new', createWorkspaceController);
workspaceRouter.put('/change/member/role/:id', changeWorkspaceMemberRoleController);

workspaceRouter.get('/all', getAllWorkspacesUserIsMemberController);

workspaceRouter.get('/members/:id', getWorkspaceMembersController);
workspaceRouter.get('/analytics/:id', getWorkspaceAnalyticsController);

workspaceRouter.get('/:id', getWorkspaceByIdController);

export { workspaceRouter };
