import jwt from "jsonwebtoken";

export function generateInvitationToken(userId, projectId) {
  const payload = { userId, projectId };

  // Create a token with an expiration time (e.g., 1 day)
  const token = jwt.sign(payload, process.env.ACESS_TOKEN_SECRET_KEY, {
    expiresIn: "2d",
  });

  return token;
}
