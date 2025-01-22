import { Router } from 'express';
import {
  createWorkspaceController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
} from '../controllers/workspace-controller';

const workspaceRouter = Router();

workspaceRouter.post('/create/new', createWorkspaceController);
workspaceRouter.get('/all', getAllWorkspacesUserIsMemberController);
workspaceRouter.get('/members/:id', getWorkspaceMembersController);
workspaceRouter.get('/:id', getWorkspaceByIdController);

export { workspaceRouter };
