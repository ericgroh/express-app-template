import dotenv from 'dotenv';
dotenv.config();

export const ENV = process.env.NODE_ENV || `development`;
export const PORT = process.env.PORT || 4000;
export const MONGO_URL  = process.env.MONGO_URL || `mongodb://localhost:27017/slam-mail`;
