import { Router } from 'express';
import { createWorkspaceController } from '../controllers/workspace-controller';

const workspaceRouter = Router();

workspaceRouter.post('/create/new', createWorkspaceController);

export { workspaceRouter };
