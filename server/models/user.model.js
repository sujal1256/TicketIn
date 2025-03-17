import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    //   projecs: [
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
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      userRole: this.userRole,
      email: this.email,
    },
    process.env.ACESS_TOKEN_SECRET_KEY,
    { expiresIn: "10h" }
  );
};

// userSchema.post('save', async function (doc) {
//   console.log(`User saved successfully\nUser_id:${doc._id})`);
// })

const User = mongoose.model("User", userSchema);

export default User;
