import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, trim: true },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    photoUrl: { type: String, trim: true }
},
    {
        timestamps: true
    }
)

export const UserModel = mongoose.model("User", userSchema);