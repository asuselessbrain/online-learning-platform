import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Course title is required"] },
    subtitle: { type: String },
    description: { type: String, required: [true, "Course description is required"] },
    thumbnail: { type: String, required: [true, "Course thumbnail is required"] },
    previewVideo: { type: String },

    learningOutcomes: {
      type: [{ type: String }],
      required: [true, "Learning outcomes are required"]
    },
    prerequisites: [{ type: String }],
    targetAudience: [{ type: String }],

    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: [true, "Category is required"] 
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "Course level is required"]
    },
    language: { type: String, required: [true, "Language is required"] },

    price: { type: Number, required: [true, "Price is required"] },
    discount: { type: Number },
    isFree: { type: Boolean, default: false },

    instructorId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Instructor", 
      required: [true, "Instructor is required"] 
    },
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "draft", 
      required: [true, "Status is required"] 
    }
  },
  { timestamps: true }
);

export const NewCourse = mongoose.model("NewCourse", courseSchema);
