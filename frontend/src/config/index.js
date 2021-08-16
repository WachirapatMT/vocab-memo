export const config = {
  apiHost: process.env.REACT_APP_API_HOST || "http://localhost:3001/api",
  cookieName: process.env.REACT_APP_COOKIE_NAME || "vocabmemo_token",
  cookieMaxAge: parseInt(process.env.REACT_APP_COOKIE_MAX_AGE) || 864000,
  flaseCardMinVocab: parseInt(process.env.REACT_APP_FLASH_CARD_MIN_VOCAB) || 3,
  quizMinVocab: parseInt(process.env.REACT_APP_QUIZ_MIN_VOCAB) || 5,
};
