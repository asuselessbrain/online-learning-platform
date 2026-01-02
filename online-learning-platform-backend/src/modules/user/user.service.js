import { UserModel } from "./user.model.js";
const createUserInDB = async(userData) => {
    const user = new UserModel(userData);
    return await user.save();
}

const getUserRole = async(email) => {
    const user = await UserModel.findOne({email})
    if(!user){
        throw new Error("User not found");
    }
    return user?.role;
}

export const UserService = {
    createUserInDB,
    getUserRole
}