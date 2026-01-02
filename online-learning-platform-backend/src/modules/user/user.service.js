import { UserModel } from "./user.model.js";
const createUserInDB = async(userData) => {
    const user = new UserModel(userData);
    return await user.save();
}

export const UserService = {
    createUserInDB
}