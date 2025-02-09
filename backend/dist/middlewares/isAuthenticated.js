"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const isAuthenticated = (req, res, next) => {
    if (!req.user || !req.user._id) {
        throw new AppError_1.UnauthorizedException('Unauthorized. Please log in.');
    }
    next();
};
exports.default = isAuthenticated;
