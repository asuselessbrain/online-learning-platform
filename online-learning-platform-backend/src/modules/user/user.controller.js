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


export const UserController = {
    createUserInDB
}