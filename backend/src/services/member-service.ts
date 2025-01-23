import { ErrorCodeEnumType } from '../enums/error-code.enum';
import { Roles } from '../enums/role.enum';
import { MemberModel } from '../models/member-model';
import { RoleModel } from '../models/roles-permission-model';
import { WorkspaceModel } from '../models/workspace-model';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../utils/AppError';

export const getMemberRoleInWorkspace = async (userId: string, workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException('Workspace not found');
  }

  const member = await MemberModel.findOne({
    userId,
    workspaceId,
  }).populate('role');

  if (!member) {
    throw new UnauthorizedException(
      'You are not a member of this workspace',
      ErrorCodeEnumType.ACCESS_UNAUTHORIZED,
    );
  }

  const roleName = member.role?.name;

  return { role: roleName };
};

/*
  // ********
  // GET WORKSPACE ROLE BY INVITE CODE
  // ********
*/
export const joinWorkspaceByInviteService = async (userId: string, inviteCode: string) => {
  const workspace = await WorkspaceModel.findOne({ inviteCode });
  if (!workspace) {
    throw new NotFoundException('Invalid invite code or  Workspace not found');
  }

  // Check if the user is already a member of the workspace
  const existingMember = await MemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  }).exec();

  if (existingMember) {
    throw new BadRequestException('You are already a member of this workspace');
  }

  const role = await RoleModel.findById({ name: Roles.MEMBER });
  if (!role) {
    throw new NotFoundException('Role not found');
  }

  // Create a new member and save it to the database
  const newMember = new MemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id,
  });

  await newMember.save();

  return { workspaceId: workspace._id, role };
};
