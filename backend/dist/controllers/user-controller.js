"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserController = void 0;
const async_handler_1 = require("../middlewares/async-handler");
const http_config_1 = require("../config/http-config");
const user_service_1 = require("../services/user-service");
exports.getCurrentUserController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const { user } = await (0, user_service_1.getCurrentUserService)(userId);
    return res.status(http_config_1.HTTP_STATUS.OK).json({
        message: 'User fetch successfully',
        user,
    });
});
