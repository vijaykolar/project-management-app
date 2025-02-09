"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspace_controller_1 = require("../controllers/workspace-controller");
const workspaceRoutes = (0, express_1.Router)();
workspaceRoutes.post('/create/new', workspace_controller_1.createWorkspaceController);
workspaceRoutes.put('/update/:id', workspace_controller_1.updateWorkspaceByIdController);
workspaceRoutes.put('/change/member/role/:id', workspace_controller_1.changeWorkspaceMemberRoleController);
workspaceRoutes.delete('/delete/:id', workspace_controller_1.deleteWorkspaceByIdController);
workspaceRoutes.get('/all', workspace_controller_1.getAllWorkspacesUserIsMemberController);
workspaceRoutes.get('/members/:id', workspace_controller_1.getWorkspaceMembersController);
workspaceRoutes.get('/analytics/:id', workspace_controller_1.getWorkspaceAnalyticsController);
workspaceRoutes.get('/:id', workspace_controller_1.getWorkspaceByIdController);
exports.default = workspaceRoutes;
