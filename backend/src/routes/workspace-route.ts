import { Router } from 'express';
import {
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
workspaceRouter.get('/all', getAllWorkspacesUserIsMemberController);
workspaceRouter.get('/members/:id', getWorkspaceMembersController);
workspaceRouter.get('/:id', getWorkspaceByIdController);
workspaceRouter.get('/analytics/:id', getWorkspaceAnalyticsController);

export { workspaceRouter };
