export const config = {
  apiHost: process.env.REACT_APP_API_HOST || "http://localhost:3001",
  cookieName: process.env.REACT_APP_COOKIE_NAME || "vocabmemo_token",
  cookieMaxAge: parseInt(process.env.REACT_APP_COOKIE_MAX_AGE) || 864000,
};
