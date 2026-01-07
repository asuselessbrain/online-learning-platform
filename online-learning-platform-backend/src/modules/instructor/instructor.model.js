import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    // Basic Personal Info
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    phoneNumber: { type: String, default: "" },
    nidNumber: { type: String, default: "", unique: true, required: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    dob: { type: Date },

    // Address
    address: {
      district: { type: String, default: "" },
      upazila: { type: String, default: "" },
      postOffice: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },

    // Profile & Professional Info
    bio: { type: String, default: "" },
    experience: { type: String, default: "" }, // e.g., "5 years web development"
    expertise: { type: [String], default: [] },
    education: { type: String, default: "" },

    // Social Links
    socialLinks: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      website: { type: String, default: "" },
      youtube: { type: String, default: "" },
      github: { type: String, default: "" },
    },

    // Courses & Performance
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course", default: [] }],
    rating: { type: Number, default: 0 }, // average rating
    totalReviews: { type: Number, default: 0 },

    // Admin & Status
    status: { type: String, enum: ["active", "pending", "suspended"], default: "active" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const InstructorModel = mongoose.model("Instructor", instructorSchema);
