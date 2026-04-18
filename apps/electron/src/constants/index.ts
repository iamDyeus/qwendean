export const LOCAL_STORAGE_KEYS = {
  LANGUAGE: "lang",
  THEME: "theme",
};

export const IPC_CHANNELS = {
  START_ORPC_SERVER: "start-orpc-server",
};

export const ENVIRONMENT_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV,
};

export const inDevelopment = ENVIRONMENT_VARIABLES.NODE_ENV === "development";

// Absolute path to the toolkit builds directory — must match agents OUTPUT_DIR
export const TOOLKIT_BUILDS_DIR = "D:\\projects\\qwendean\\apps\\toolkit\\builds";
export const TOOLKIT_APP_BUILDS_DIR = "D:\\projects\\qwendean\\apps\\toolkit\\app\\builds\\[buildId]";
