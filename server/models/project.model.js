import mongoose from "mongoose";

const memberSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userRole: {
    type: String,
    default: "User",
    enum: ["User", "Admin"],
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
  },
};

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    // FIXME: Give default user on frontend
    projectOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: [memberSchema],
    // FIXME: Give default current Data on frontend
    startDate: {
      type: Date,
      required: true,
    },
    // User can have this, but don't need to
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
