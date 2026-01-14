import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewCourse",
    required: true,
  },
  certificateUrl: {
    type: String,
    required: true,
  },
  certificateId: {
    type: String,
    unique: true
  },
  studentName: String,
  courseName: String,
  instructorName: String,
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["valid", "revoked"],
    default: "valid"
  },
  isPublic: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

CertificateSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

export const certificate = mongoose.model("Certificate", CertificateSchema);
