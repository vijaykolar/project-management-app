import { UserModel } from '../models/user-model';
import { BadRequestException } from '../utils/AppError';

export const fetchCurrentUser = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate('currentWorkspace')
    .select('-password')
    .lean();

  if (!user) {
    throw new BadRequestException('User not found');
  }

  return {
    user,
  };
};
