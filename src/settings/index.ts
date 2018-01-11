import * as dotenv from "dotenv";

// Load dotenv config
dotenv.config({ path: ".env" });

// Export settings
export const debug = process.env.NODE_ENV !== "production";
export const mongoUri = process.env.MONGO_URI;