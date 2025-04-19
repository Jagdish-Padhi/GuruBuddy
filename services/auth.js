import jwt from "jwt";

const secret = "jag123";

//createTokens
exports.setUser = (user) => {
  return jwt.sign({ _id: user.id, email: user.email }, secret);
};

//verify Tokens
exports.getUser = (token) => {
  if (!token) return null;

  return jwt.verify(token, secret);
};
