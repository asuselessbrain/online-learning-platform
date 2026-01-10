import { UserService } from "./user.service.js";

const createUserInDB = async (req, res) => {
    const userData = req.body;
    try {
        const result = await UserService.createUserInDB(userData);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error
        });
    }
}

const getUserRole = async (req, res) => {
    const email = req.params.email;
    try {
        const role = await UserService.getUserRole(email);
        res.status(200).json({
            success: true,
            message: "User role fetched successfully",
            data: role
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user role",
            error: error
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const result = await UserService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error
        });
    }
}

const getMyProfile = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await UserService.getMyProfile(email);
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
            error: error
        });
    }
}


export const UserController = {
    createUserInDB,
    getUserRole,
    getAllUsers,
    getMyProfile
}