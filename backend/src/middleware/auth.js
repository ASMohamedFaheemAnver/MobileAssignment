import jwt from "jsonwebtoken";

const getUserData = (request, requireAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization ||
      request.connection.variables.Authorization;

  // console.log(request.request.headers.authorization);

  try {
    if (header) {
      const token = header.replace("Bearer ", "");
      const decodedData = jwt.verify(token, process.env.secret_word);
      return decodedData;
    }
  } catch (e) {
    const error = new Error(e.message);
    error.data = [e];
    error.code = 403;
    throw error;
  }

  if (requireAuth) {
    throw new Error("authentication required");
  }

  return null;
};

export { getUserData as default };
