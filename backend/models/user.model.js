import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    userRole: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    //   projects: [
    //     {
    //         type:
    //     }
    //   ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.post('save', async function (doc) {
//   console.log(`User saved successfully\nUser_id:${doc._id})`);
// })

const User = mongoose.model("User", userSchema);

export default User;
