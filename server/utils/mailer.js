import { createTransport } from "nodemailer";

async function sendOtpToUser(user) {
  try {
    const transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const message = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user?.email,
      subject: "Message title",
      text: `Use this OTP ${user.otp} for ${user.email}`,
    });
    console.log(message.messageId);
  } catch (error) {
    console.log("❌ Mail not sent" + error);
  }
}

async function handleAddUserEmail(project, email, projectOwner, res) {
  if (!project || !email || !projectOwner) {
    return res.status(400).json(new ApiError(400, "Values are not valid"));
  }

  try {
    const transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const inviteEmail = `${process.env.CLIENT_URL}/invite?q=${email}&p=${project._id}`;
    const message = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "You are invited to join a project",
      text: `You are invited to join a project, click on the link to accept the invitation ${inviteEmail}`,
    });

    console.log(message?.messageId, "Mail sent successful");
  } catch (error) {
    console.log("❌ Mail not sent" + error);
  }
}

export { sendOtpToUser, handleAddUserEmail };
