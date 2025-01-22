import mongoose from 'mongoose';
import { Roles } from '../enums/role.enum';
import { MemberModel } from '../models/member-model';
import { RoleModel } from '../models/roles-permission-model';
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
