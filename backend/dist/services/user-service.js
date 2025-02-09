"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserService = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const AppError_1 = require("../utils/AppError");
const getCurrentUserService = async (userId) => {
    const user = await user_model_1.default.findById(userId).populate('currentWorkspace').select('-password');
    if (!user) {
        throw new AppError_1.BadRequestException('User not found');
    }
    return {
        user,
    };
};
exports.getCurrentUserService = getCurrentUserService;
