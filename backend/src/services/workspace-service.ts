import mongoose from 'mongoose';
import { Roles } from '../enums/role.enum';
import { TaskStatusEnum } from '../enums/TaskStatus.enum';
import { MemberModel } from '../models/member-model';
import { RoleModel } from '../models/roles-permission-model';
import { TaskModel } from '../models/task-model';
import { UserModel } from '../models/user-model';
import { WorkspaceModel } from '../models/workspace-model';
import { NotFoundException } from '../utils/AppError';

type Workspace = {
  name: string;
  description?: string | undefined;
};

/*
  // *********
  //  CREATE WORKSPACE
  // *********
*/
export const createWorkspaceService = async (userId: string, body: Workspace) => {
  const { name, description } = body;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const ownerRole = await RoleModel.findOne({ name: Roles.OWNER });

  if (!ownerRole) {
    throw new NotFoundException('Owner role not found');
  }

  const workspace = new WorkspaceModel({
    name,
    description,
    owner: user._id,
  });

  await workspace.save();

  const member = new MemberModel({
    userId: user._id,
    workspaceId: workspace._id,
    role: ownerRole._id,
    joinedAt: new Date(),
  });

  await member.save();

  user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;

  await user.save();

  return {
    workspace,
  };
};

/*
  // *********
  //  GET ALL WORKSPACES USER IS MEMBER
  // *********
*/
export const getAllUserWorkspacesUserIsMemberService = async (userId: string) => {
  const memberships = await MemberModel.find({ userId })
    .populate('workspaceId')
    .select('-password')
    .exec();

  const workspaces = memberships
    .map((member) => member.workspaceId)
    .filter((workspaceId) => workspaceId !== null);

  if (!workspaces) {
    throw new NotFoundException('Workspaces not found');
  }

  return {
    workspaces,
  };
};

/*
  // *********
  //  GET WORKSPACE BY ID
  // *********
*/
export const getWorkspaceByIdService = async (workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundException('Workspace not found');
  }

  const members = await MemberModel.find({ workspaceId }).populate('role');

  const workspaceWithMembers = {
    ...workspace.toObject(),
    members,
  };

  return {
    workspace: workspaceWithMembers,
  };
};

/*
  // *********
  //  GET WORKSPACE MEMBERS
  // *********
*/
export const getWorkspaceMembersService = async (workspaceId: string) => {
  const members = await MemberModel.find({ workspaceId })
    .populate('userId', 'name email profilePicture -password')
    .populate('role', 'name');

  const roles = await RoleModel.find({}, { name: 1, _id: 1 }).select('-permission').lean();

  return {
    members,
    roles,
  };
};

/*
  // *********
  //  GET WORKSPACE ANALYTICS
  // *********
*/
export const getWorkspaceAnalyticsService = async (workspaceId: string) => {
  const currentDate = new Date();
  const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId });

  const overdueTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    status: { $ne: TaskStatusEnum.DONE },
    dueDate: { $lt: currentDate },
  });

  const completedTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    status: TaskStatusEnum.DONE,
  });

  const analytics = {
    totalTasks,
    overdueTasks,
    completedTasks,
  };

  return {
    analytics,
  };
};

export const changeMemberRoleService = async (
  memberId: string,
  roleId: string,
  workspaceId: string,
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundException('Workspace not found');
  }

  const role = await RoleModel.findById(roleId);

  if (!role) {
    throw new NotFoundException('Role not found');
  }

  const member = await MemberModel.findOne({
    userId: memberId,
    workspaceId,
  });

  if (!member) {
    throw new NotFoundException('Member not found in the workspace');
  }

  member.role = role;

  await member.save();

  return {
    member,
  };
};
