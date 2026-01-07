import { UserModel } from "./user.model.js";
const createUserInDB = async (userData) => {
    const user = new UserModel(userData);
    return await user.save();
}

const getUserRole = async (email) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
        throw new Error("User not found");
    }
    return user?.role;
}

const getAllUsers = async () => {
    const result = await UserModel.find({});
    return {
        meta: {
            total: 10,
            limit: 10,
            page: 1
        },
        data: result
    }
}

export const UserService = {
    createUserInDB,
    getUserRole,
    getAllUsers
}