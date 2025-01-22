import { Router } from 'express';
import {
  createWorkspaceController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceByIdController,
} from '../controllers/workspace-controller';

const workspaceRouter = Router();

workspaceRouter.post('/create/new', createWorkspaceController);
workspaceRouter.get('/all', getAllWorkspacesUserIsMemberController);
workspaceRouter.get('/:id', getWorkspaceByIdController);

export { workspaceRouter };
