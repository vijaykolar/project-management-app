import { Router } from 'express';
import { createWorkspaceController, getAllWorkspacesUserIsMemberController } from '../controllers/workspace-controller';

const workspaceRouter = Router();

workspaceRouter.post('/create/new', createWorkspaceController);
workspaceRouter.get("/all", getAllWorkspacesUserIsMemberController);

export { workspaceRouter };
