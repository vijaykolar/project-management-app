import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/http-config';
import { asyncHandler } from '../middlewares/async-handler';
import { fetchCurrentUser } from '../services/user-servcie';

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { user } = await fetchCurrentUser(userId);

  res.status(HTTP_STATUS.OK).json({
    message: 'User fetched successfully',
    user,
  });
});
